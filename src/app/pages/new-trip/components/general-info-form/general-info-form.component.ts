import { Component, OnInit } from '@angular/core';
import { GeonamesService } from '../../../../shared/services/geonames.service';
import { Country } from '../../../../shared/interfaces/country.interface';

@Component({
  selector: 'app-general-info-form',
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.scss'],
})
export class GeneralInfoFormComponent implements OnInit {
  countries: Country[] = [];
  constructor(private geonamesService: GeonamesService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.geonamesService
      .fetchCountries()
      .subscribe((value) => (this.countries = value));
  }
}
