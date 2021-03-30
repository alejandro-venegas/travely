import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { City } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root',
})
export class GeonamesService {
  private _baseUrl = 'http://api.geonames.org/';
  private _username = environment.geoNamesUsername;
  constructor(private http: HttpClient) {}

  fetchCountries(): Observable<Country[]> {
    const url = this._baseUrl + 'countryInfoJSON?username=' + this._username;
    return this.http
      .get<{ geonames: Country[] }>(url)
      .pipe(map((value) => value.geonames));
  }

  fetchCities(countryCode: string): Observable<City[]> {
    const url =
      this._baseUrl +
      'searchJSON?username=' +
      this._username +
      '&country=' +
      countryCode;

    return this.http
      .get<{ totalResultsCount: number; geonames: City[] }>(url)
      .pipe(map((value) => value.geonames));
  }
}
