import { Country } from './country.interface';
import { City } from './city.interface';
import { Picture } from './picture.interface';

export interface Trip {
  name?: string;
  country: Country;
  city: City;
  fromDate: Date;
  toDate: Date;
  picture: Picture;
}
