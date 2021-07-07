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
  siteColors: [number, string][] = [...SightseeingPoint.colors()];

  constructor(private sightsService: SightsService, private router: Router) {
  }

  ngOnInit(): void {
    this.selectedSight = this.sightsService.selectedSight;
    this.site.country.name = 'POLAND';
    this.site.country.iataCode = 'PL';
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
      color: new FormControl(this.site.color, [
        Validators.required]
      )
    });
    if (this.selectedSight) {
      this.addForm.patchValue(this.selectedSight);
    }
  }

  get name(): AbstractControl {
    return this.addForm.get('name');
  }

  get longitude(): AbstractControl {
    return this.addForm.get('longitude');
  }

  get latitude(): AbstractControl {
    return this.addForm.get('latitude');
  }

  get description(): AbstractControl {
    return this.addForm.get('description');
  }

  get color(): AbstractControl {
    return this.addForm.get('color');
  }

  onSubmit(addForm: FormGroup): void {
    this.selectedSight ? this.editSight(addForm) : this.addSight(addForm);
  }

  private addSight(addForm: FormGroup): void {
    this.sightsService.addSight(addForm.value).subscribe(() => this.router.navigate(['']));
  }

  private editSight(addForm: FormGroup): void {
    this.sightsService.updateSight(addForm.value).subscribe(() => this.router.navigate(['']));
  }
}
