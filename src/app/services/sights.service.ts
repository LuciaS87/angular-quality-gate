import {Injectable} from '@angular/core';
import {SightseeingPoint} from '../models/sightseeing-point';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {Country} from '../models/country';
import {map} from 'rxjs/operators';
import {Location} from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class SightsService {
  selectedSight: SightseeingPoint;
  selectedCity = new Subject<Location>();

  constructor(private http: HttpClient) {
  }

  private static generateId(length = 10): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += environment.characters.charAt(Math.floor(Math.random() *
        environment.characters.length));
    }
    return result;
  }

  getSights(): Observable<SightseeingPoint[]> {
    return this.http.get<SightseeingPoint[]>(`${environment.apiUrl}/sights`).pipe(
      map(sights => {
        return sights.map(sight => {
          const country = new Country();
          country.name = 'POLAND';
          country.iataCode = 'PL';

          return new SightseeingPoint(
            sight.name,
            sight.longitude,
            sight.latitude,
            country,
            sight.description,
            sight.color,
            sight.id
          );
        });
      })
    );
  }

  getSightsInRange(currentCity: Location, inRange: number): Observable<SightseeingPoint[]> {
    return this.getSights().pipe(map(sights => {
      return sights.filter(sight => sight.range(currentCity) <= inRange);
    }));
  }


  addSight(sight: SightseeingPoint): Observable<void> {
    sight.id = SightsService.generateId();
    return this.http.post<void>(`${environment.apiUrl}/sights`, sight);
  }

  updateSight(sight: SightseeingPoint): Observable<SightseeingPoint> {
    return this.http.put<SightseeingPoint>(`${environment.apiUrl}/sights/${this.selectedSight.id}`, sight);
  }

  deleteSight(sightId: string): Observable<SightseeingPoint> {
    return this.http.delete<SightseeingPoint>(`${environment.apiUrl}/sights/${sightId}`);
  }
}
