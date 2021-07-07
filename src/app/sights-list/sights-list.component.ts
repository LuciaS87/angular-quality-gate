import {Component, OnInit} from '@angular/core';
import {SightseeingPoint} from '../models/sightseeing-point';
import {SightsService} from '../services/sights.service';

@Component({
  selector: 'app-sights-list',
  templateUrl: './sights-list.component.html',
  styleUrls: ['./sights-list.component.scss']
})
export class SightsListComponent implements OnInit {
  selectedSight: SightseeingPoint;
  sights: SightseeingPoint[];

  constructor(private sightsService: SightsService) {
  }

  ngOnInit(): void {
    this.getAllSights();
    this.sightsService.selectedSight = undefined;
  }

  getAllSights(): void {
    this.sightsService.getSights().subscribe(sights => {
      this.sights = sights;
    });
  }

  setActiveSight(site: SightseeingPoint): void {
    this.selectedSight = site;
    this.sightsService.selectedSight = this.selectedSight;
  }

  deleteSight(sight: SightseeingPoint): void {
    this.sightsService.deleteSight(sight.id).subscribe(() => this.getAllSights());
  }
}
