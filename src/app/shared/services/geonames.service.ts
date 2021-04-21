import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { City } from '../interfaces/city.interface';
import { LoadingSpinnerService } from './loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class GeonamesService {
  private _baseUrl = 'http://api.geonames.org/';
  private _username = environment.geoNamesUsername;
  constructor(
    private http: HttpClient,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  fetchCountries(): Observable<Country[]> {
    this.loadingSpinnerService.toggleLoadingSpinner(true);
    const url = this._baseUrl + 'countryInfoJSON?username=' + this._username;
    return this.http.get<{ geonames: Country[] }>(url).pipe(
      map((value) => value.geonames),
      finalize(() => this.loadingSpinnerService.toggleLoadingSpinner(false))
    );
  }

  fetchCities(countryCode: string): Observable<City[]> {
    this.loadingSpinnerService.toggleLoadingSpinner(true);
    const url =
      this._baseUrl +
      'searchJSON?username=' +
      this._username +
      '&country=' +
      countryCode;

    return this.http
      .get<{ totalResultsCount: number; geonames: City[] }>(url)
      .pipe(
        map((value) => value.geonames),
        finalize(() => this.loadingSpinnerService.toggleLoadingSpinner(false))
      );
  }
}
