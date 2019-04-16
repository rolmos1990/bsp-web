import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowInsuranceDetailComponent } from './pages/show.insurance-detail';
import { InsuranceDetailRoutingModule } from './insurance-detail-routing.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    ShowInsuranceDetailComponent
  ],
  imports: [
    CommonModule,
    InsuranceDetailRoutingModule,
    AccordionModule.forRoot()
  ]
})
export class InsuranceDetailModule { }
