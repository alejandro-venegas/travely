import { Component, OnInit, ViewChild } from '@angular/core';
import { formFade } from './animations/form-fade.animation';
import { Trip } from '../../shared/interfaces/trip.interface';
import { GeneralInfoFormComponent } from './components/general-info-form/general-info-form.component';
import { FlickrService } from '../../shared/services/flickr.service';
import { TabGroupComponent } from './components/tab-group/tab-group.component';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {
  trip: Trip | null = null;
  imgUrl = '';

  @ViewChild('generalInfoForm', {
    read: GeneralInfoFormComponent,
    static: false,
  })
  generalInfoForm: GeneralInfoFormComponent | null = null;
  @ViewChild('tabGroup', {
    read: TabGroupComponent,
    static: false,
  })
  tabGroup: TabGroupComponent | null = null;

  constructor(private flickrService: FlickrService) {}

  ngOnInit(): void {}

  onNextClick(): void {
    const trip = this.generalInfoForm?.onSave();

    if (trip) {
      this.trip = trip;
    }
  }
  onLoaded(): void {
    this.tabGroup?.next();
  }
  onBackClick(): void {}
}
