import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from '../../../../shared/interfaces/trip.interface';
import { FlickrService } from '../../../../shared/services/flickr.service';
import { forkJoin, of } from 'rxjs';
import { WeatherService } from '../../../../shared/services/weather.service';
import { Weather } from '../../../../shared/interfaces/weather.interface';
import { WeatherDay } from '../../../../shared/interfaces/weather-day.interface';
import { LoadingSpinnerService } from '../../../../shared/services/loading-spinner.service';
import { finalize } from 'rxjs/operators';
import { tryCatch } from 'rxjs/internal-compatibility';
import { Todo } from '../../../../shared/interfaces/todo.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-trip-review',
  templateUrl: './trip-review.component.html',
  styleUrls: ['./trip-review.component.scss'],
})
export class TripReviewComponent implements OnInit {
  private _trip: Trip | null = null;
  weather: Weather | null = null;
  weatherDay: WeatherDay | null = null;
  imgUrl = '';
  todoList: Todo[] = [
    { id: '1', value: 'comprar abrigo', isCompleted: false },
    { id: '1', value: 'comprar guantes', isCompleted: false },
    { id: '1', value: 'llevar bufanda', isCompleted: false },
    { id: '1', value: 'huevos', isCompleted: false },
  ];

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
    private weatherService: WeatherService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {}

  getData(trip: Trip): void {
    this.loadingSpinnerService.toggleLoadingSpinner();
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
      if (this._trip !== null && value) {
        this._trip.picture = value.image;
        this.imgUrl =
          this.flickrService.parseImageDataToUrl(value.image) +
          '?' +
          new Date().getTime();
        this.weather = value.weather;
        this.weatherDay = value.weather.days[0];
      }
    });
  }
  onImageLoaded(): void {
    this.loaded.emit();
    this.loadingSpinnerService.toggleLoadingSpinner();
  }
}
