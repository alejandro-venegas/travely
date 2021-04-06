import { Component, OnInit } from '@angular/core';
import { formFade } from './animations/form-fade.animation';
import { Trip } from '../../shared/interfaces/trip.interface';
import { GeneralInfoFormComponent } from './components/general-info-form/general-info-form.component';
import { FlickrService } from '../../shared/services/flickr.service';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
  animations: [formFade],
})
export class NewTripComponent implements OnInit {
  stepperState: string[] = ['center', 'right'];
  trip?: Trip;
  imgUrl = '';

  constructor(private flickrService: FlickrService) {}

  ngOnInit(): void {}

  onNextClick(generalInfoForm: GeneralInfoFormComponent): void {
    const trip = generalInfoForm.onSave();

    if (trip) {
      this.flickrService
        .fetchImageData(trip?.country.countryName || '', trip?.city.name || '')
        .subscribe((value) => {
          this.imgUrl = this.flickrService.parseImageDataToUrl(value);
          this.setStepperState('next');
        });
    }
  }
  onBackClick(): void {
    this.setStepperState('back');
  }

  setStepperState(mode: 'next' | 'back'): void {
    const currentIndex = this.stepperState.findIndex(
      (value) => value === 'center'
    );
    if (mode === 'next') {
      const nextIndex = currentIndex + 1;
      if (nextIndex < this.stepperState.length) {
        this.stepperState[currentIndex] = 'left';
        this.stepperState[nextIndex] = 'center';
      }
    } else {
      const currentIndex = this.stepperState.findIndex(
        (value) => value === 'center'
      );
      const pastIndex = currentIndex - 1;
      if (pastIndex >= 0) {
        this.stepperState[currentIndex] = 'right';
        this.stepperState[pastIndex] = 'center';
      }
    }
  }
}
