import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowInsuranceDetailComponent } from './pages/show.insurance-detail';
import { InsuranceDetailRoutingModule } from './insurance-detail-routing.module';

@NgModule({
  declarations: [
    ShowInsuranceDetailComponent
  ],
  imports: [
    CommonModule,
    InsuranceDetailRoutingModule
  ]
})
export class InsuranceDetailModule { }
