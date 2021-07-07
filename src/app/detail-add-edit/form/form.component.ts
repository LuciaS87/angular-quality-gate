import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SightseeingPoint} from '../../models/sightseeing-point';
import {SightsService} from '../../services/sights.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../models/country';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  site: SightseeingPoint = new SightseeingPoint('', 0, 0, new Country(), '', 0);
  addForm!: FormGroup;
  selectedSight!: SightseeingPoint;
  siteColors: number[];

  constructor(private sightsService: SightsService, private router: Router) {
  }

  ngOnInit(): void {
    this.siteColors = Array.from(SightseeingPoint.colors().keys());
    this.selectedSight = this.sightsService.selectedSight;
    this.site.country.name = 'POLAND';
    this.site.country.iata_code = 'PL';
    this.addForm = new FormGroup({
      name: new FormControl(this.site.name, [
        Validators.required,
      ]),
      longitude: new FormControl(this.site.longitude, [
        Validators.required,
      ]),
      latitude: new FormControl(this.site.latitude, [
        Validators.required,
      ]),
      description: new FormControl(this.site.description, [
        Validators.required,
        Validators.maxLength(256)
      ]),
      color: new FormControl(this.site.color,
        [Validators.required]
      )
    });
    if (this.selectedSight) {
      this.addForm.patchValue(this.selectedSight);
    }
  }

  get name(): AbstractControl {
    return this.addForm.get('name') as AbstractControl;
  }

  get longitude(): AbstractControl {
    return this.addForm.get('longitude') as AbstractControl;
  }

  get latitude(): AbstractControl {
    return this.addForm.get('latitude') as AbstractControl;
  }

  get description(): AbstractControl {
    return this.addForm.get('description') as AbstractControl;
  }

  get color(): AbstractControl {
    return this.addForm.get('color') as AbstractControl;
  }

  onSubmit(addForm: FormGroup): void {
    this.selectedSight ? this.editSite(addForm) : this.addSite(addForm);
  }

  private addSite(addForm: FormGroup): void {
    this.sightsService.addSite(addForm.value).subscribe(() => this.router.navigate(['']));
  }

  private editSite(addForm: FormGroup): void {
    this.sightsService.updateSite(addForm.value).subscribe(() => this.router.navigate(['']));
  }
}
