import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from '../../../../shared/interfaces/trip.interface';
import { FlickrService } from '../../../../shared/services/flickr.service';

@Component({
  selector: 'app-trip-review',
  templateUrl: './trip-review.component.html',
  styleUrls: ['./trip-review.component.scss'],
})
export class TripReviewComponent implements OnInit {
  private _trip: Trip | null = null;
  private imgUrl = '';

  @Input() set trip(trip: Trip | null) {
    this._trip = trip;
  }
  get trip(): Trip | null {
    return this._trip;
  }

  @Output() loaded = new EventEmitter();
  constructor(private flickrService: FlickrService) {}

  ngOnInit(): void {}

  getImageData(trip: Trip): void {
    this.flickrService
      .fetchImageData(trip.country.countryName, trip.city.name)
      .subscribe((value) => {
        if (this._trip !== null) {
          this._trip.picture = value;
          this.imgUrl = this.flickrService.parseImageDataToUrl(value);
        }
      });
  }
  onImageLoaded(): void {
    this.loaded.emit();
  }
}
