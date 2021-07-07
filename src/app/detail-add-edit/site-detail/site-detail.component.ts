import {Component, OnInit} from '@angular/core';
import {SightseeingPoint} from '../../models/sightseeing-point';
import {SightsService} from '../../services/sights.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.scss']
})
export class SiteDetailComponent implements OnInit {
  selectedSight: SightseeingPoint;
  id: string;

  constructor(private sightService: SightsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.sightService.selectedSight === undefined) {
      this.router.navigate(['']);
    }
    this.selectedSight = this.sightService.selectedSight;
  }

}
