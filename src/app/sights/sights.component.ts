import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SightseeingPoint} from '../models/sightseeing-point';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {SightsService} from '../services/sights.service';
import {MapComponent} from '../map/map.component';
import {Location} from '../models/location';
import {Country} from '../models/country';

@Component({
  selector: 'app-sights',
  templateUrl: './sights.component.html',
  styleUrls: ['./sights.component.scss']
})
export class SightsComponent implements OnInit, OnDestroy {

  @ViewChild('mapComponent', {static: false}) mapComponent: MapComponent;
  currentCity: Location;
  selectedCity: Subject<Location>;
  sights$: Observable<SightseeingPoint[]>;

  constructor(
    private sightsService: SightsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.selectedCity = this.sightsService.selectedCity;
    this.selectedCity.subscribe(city => {
      this.currentCity = city;
      this.sights$ = this.sightsService.getSightsInRange(this.currentCity, 15000);
    });
    this.selectedCity.next(new Location(19.9449, 50.0646));
  }

  centerMap(location: Location): void {
    this.mapComponent.centerMap(location);
  }

  selectSight(sight: SightseeingPoint): void {
    this.sightsService.selectedSight = sight;
    this.router.navigate(['/sights']).then();
  }

  ngOnDestroy(): void {
    this.selectedCity.unsubscribe();
  }
}
