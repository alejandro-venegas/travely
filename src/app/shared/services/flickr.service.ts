import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Picture } from '../interfaces/picture.interface';
import { HttpClient } from '@angular/common/http';
import { concatMap, map } from 'rxjs/operators';
import { LoadingSpinnerService } from './loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  baseApiUrl = 'https://www.flickr.com/services/rest/';

  constructor(private http: HttpClient) {}

  fetchImageData(country: string, place: string): Observable<Picture> {
    country = country.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    place = place.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const url =
      this.baseApiUrl +
      `?method=flickr.photos.search&api_key=${environment.flickrApiKey}&text=${place} City, ${country}&format=rest&sort=relevance&format=json&nojsoncallback=?&page=1&per_page=1&accuracy=6`;

    return this.http
      .get<{
        photos: {
          photo: Picture[];
        };
      }>(url)
      .pipe(
        concatMap((value) => {
          if (value.photos.photo.length > 0) {
            return of(value);
          } else {
            const newUrl =
              this.baseApiUrl +
              `?method=flickr.photos.search&api_key=${environment.flickrApiKey}&text=${country}&format=rest&sort=relevance&format=json&nojsoncallback=?&page=1&per_page=1&accuracy=6`;
            return this.http.get<{
              photos: {
                photo: Picture[];
              };
            }>(newUrl);
          }
        }),
        map((value) => {
          return value.photos.photo[0];
        })
      );
  }

  parseImageDataToUrl(picture: Picture, size?: 't' | 'n'): string {
    return `https://live.staticflickr.com/${picture.server}/${picture.id}_${
      picture.secret
    }${size ? '_' + size : ''}.jpg`;
  }
}
