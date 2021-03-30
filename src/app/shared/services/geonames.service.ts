import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeonamesService {
  private _baseUrl = 'http://api.geonames.org/';
  private _username = environment.geoNamesUsername;
  constructor() {}
}
