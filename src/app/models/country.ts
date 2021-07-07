import {Location} from './location';

export class Country {
  name: string;
  iataCode: string;


  static cities(): Map<string, Location> {
    return new Map([
      ['Krakow', new Location(19.9449, 50.0646)],
      ['Warsaw', new Location(21.0122, 52.2297)],
      ['Wroclaw', new Location(17.0385, 51.1079)]]);
  }
}
