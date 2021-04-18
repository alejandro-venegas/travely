export interface Weather {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: Day[];
}

interface Normal {
  tempmax: number[];
  tempmin: number[];
  feelslike: number[];
  precip: number[];
  humidity: number[];
  snowdepth: number[];
  windspeed: number[];
  windgust: number[];
  winddir: number[];
  cloudcover: number[];
}

interface Day {
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  precipcover: number;
  preciptype?: any;
  snow?: any;
  snowdepth: number;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation?: any;
  solarenergy?: any;
  uvindex?: any;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
  conditions: string;
  description: string;
  icon: string;
  stations?: any;
  source: string;
  normal: Normal;
}
