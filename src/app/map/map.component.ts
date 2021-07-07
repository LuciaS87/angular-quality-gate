import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {SightseeingPoint} from '../models/sightseeing-point';
import * as mapbox from 'ngx-mapbox-gl';
import {Location} from '../models/location';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @ViewChild(mapbox.MapComponent, { static: true }) map;
  @Input() location: Location;
  @Input() sights: SightseeingPoint[];
  @Output() selectedSightEvent = new EventEmitter<SightseeingPoint>();
  loading = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.location) { this.centerMap(changes.location.currentValue); }
  }
  centerMap(location: Location): void {
    this.loading = false;
    this.map.mapInstance.flyTo({ center: [location.longitude, location.latitude] });
  }
}
