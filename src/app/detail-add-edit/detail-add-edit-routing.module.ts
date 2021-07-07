import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormComponent} from './form/form.component';
import {SiteDetailComponent} from './site-detail/site-detail.component';

const routes: Routes = [
  {path: 'detail/:id', component: SiteDetailComponent},
  {path: 'add', component: FormComponent},
  {path: 'edit/:id', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailAddEditRoutingModule { }
