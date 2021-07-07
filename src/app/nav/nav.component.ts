import {Component} from '@angular/core';
import {Country} from '../models/country';
import {SightsService} from '../services/sights.service';
import {Location} from '../models/location';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  countryCities: Map<string, Location> = Country.cities();
  citiesNames: string[] = [...this.countryCities.keys()];
  links = [
    {
      title: 'LIST',
      path: 'sights-list'
    },
    {
      title: 'MAP',
      path: 'sights'
    },
    {
      title: 'Add Site',
      path: 'lazy/add',
      style: 'addButton'
    }
  ];

  constructor(private sightsService: SightsService) {
  }



  onItemChange(event: any): void {
    const myCity: string = event.target.value;
    const selectedCity: Location = this.countryCities.get(myCity);
    this.sightsService.selectedCity.next(selectedCity);
  }
}
