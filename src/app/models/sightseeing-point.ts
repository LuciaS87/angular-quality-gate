import {Country} from './country';
import {Location} from './location';
export class SightseeingPoint {
  constructor(
    public name: string = '',
    public longitude: number = 0,
    public latitude: number = 0,
    public country: Country,
    public description: string = '',
    public color: number = 0,
    public id?: string
  ) {
  }

  static colors(): Map<number, string> {
    return new Map([[1, '#FF5733'], [2, '#54CCE2'], [3, '#973AFF']]);
  }

  getColor(color: number): string {
    return SightseeingPoint.colors().get(+color);
  }

  range(initLocal: Location): number{
    const lat1 = initLocal.latitude;
    const lat2 = this.latitude;
    const R = 6371e3; // metres
    const Fi1 = lat1 * Math.PI / 180; // φ, λ in radians
    const Fi2 = lat2 * Math.PI / 180;
    const deltaFi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (this.longitude - initLocal.longitude) * Math.PI / 180;

    const a = Math.sin(deltaFi / 2) * Math.sin(deltaFi / 2) +
      Math.cos(Fi1) * Math.cos(Fi2) *
      Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    console.log(R * c, 'range');
    return R * c; // in metres
  }
}
