import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from '../../../../shared/interfaces/trip.interface';
import { FlickrService } from '../../../../shared/services/flickr.service';
import { forkJoin } from 'rxjs';
import { WeatherService } from '../../../../shared/services/weather.service';
import { Weather } from '../../../../shared/interfaces/weather.interface';

@Component({
  selector: 'app-trip-review',
  templateUrl: './trip-review.component.html',
  styleUrls: ['./trip-review.component.scss'],
})
export class TripReviewComponent implements OnInit {
  private _trip: Trip | null = null;
  weather: Weather | null = null;
  imgUrl = '';

  @Input() set trip(trip: Trip | null) {
    this._trip = trip;
    if (trip) {
      this.getData(trip);
    }
  }
  get trip(): Trip | null {
    return this._trip;
  }

  @Output() loaded = new EventEmitter();
  constructor(
    private flickrService: FlickrService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {}

  getData(trip: Trip): void {
    forkJoin({
      image: this.flickrService.fetchImageData(
        trip.country.countryName,
        trip.city.name
      ),
      weather: this.weatherService.fetchWeather(
        trip.city,
        trip.country,
        trip.fromDate
      ),
    }).subscribe((value) => {
      if (this._trip !== null) {
        this._trip.picture = value.image;
        this.imgUrl = this.flickrService.parseImageDataToUrl(value.image);
        this.weather = value.weather;
      }
    });
  }
  onImageLoaded(): void {
    this.loaded.emit();
  }
}
