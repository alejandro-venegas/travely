import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../interfaces/city.interface';
import { Country } from '../interfaces/country.interface';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Weather } from '../interfaces/weather.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  private apiKey = environment.visualCrossingApiKey;
  constructor(private http: HttpClient) {}

  fetchWeather(city: City, country: Country, date: Date): Observable<Weather> {
    const formatedDate = date.toISOString().split('T')[0];
    let url = `${this.baseUrl}${city.name}, ${country.countryName}/${formatedDate}?unitGroup=metric&key=${this.apiKey}`;
    return this.http.get<Weather>(encodeURI(url)).pipe(
      catchError((err) => {
        url = `${this.baseUrl}${country.countryName}/${formatedDate}?unitGroup=metric&key=${this.apiKey}`;
        return this.http.get<Weather>(encodeURI(url));
      })
    );
  }
}
