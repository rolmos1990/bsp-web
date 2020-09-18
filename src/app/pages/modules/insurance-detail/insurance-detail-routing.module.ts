import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowInsuranceDetailComponent } from './pages/show.insurance-detail';

const routes: Routes = [
  {
    path: '',
    component: ShowInsuranceDetailComponent,
    pathMatch: 'full',
    data: { title: 'Banesco Seguros' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceDetailRoutingModule { }
