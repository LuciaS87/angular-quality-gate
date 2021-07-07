import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailAddEditRoutingModule } from './detail-add-edit-routing.module';
import { SiteDetailComponent } from './site-detail/site-detail.component';
import { FormComponent } from './form/form.component';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SiteDetailComponent, FormComponent],
  imports: [
    BrowserModule,
    CommonModule,
    DetailAddEditRoutingModule,
    ReactiveFormsModule
  ]
})
export class DetailAddEditModule { }
