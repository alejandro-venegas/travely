import { Component, OnInit, ViewChild } from '@angular/core';
import { GeonamesService } from '../../../../shared/services/geonames.service';
import { Country } from '../../../../shared/interfaces/country.interface';
import { City } from '../../../../shared/interfaces/city.interface';
import { NgForm } from '@angular/forms';
import { Trip } from '../../../../shared/interfaces/trip.interface';

@Component({
  selector: 'app-general-info-form',
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.scss'],
})
export class GeneralInfoFormComponent implements OnInit {
  countries: Country[] = [];
  cities: City[] = [];

  @ViewChild('form', { static: true }) form?: NgForm;
  constructor(private geonamesService: GeonamesService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.geonamesService
      .fetchCountries()
      .subscribe((value) => (this.countries = value));
  }

  onCountrySelected(country: Country): void {
    this.geonamesService
      .fetchCities(country.countryCode)
      .subscribe((res) => (this.cities = res));
  }

  onSave(): Trip | undefined {
    if (this.form?.valid) {
      const formData = this.form.value;

      const trip = { ...formData } as Trip;
      trip.fromDate = this.parseToDate(formData.fromDate);
      trip.toDate = this.parseToDate(formData.toDate);
      return trip as Trip;
    }
    this.form?.control.markAllAsTouched();
    return undefined;
  }

  parseToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  }
}
