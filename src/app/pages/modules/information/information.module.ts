import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationRoutingModule } from './information-routing.module';

import { ShowInformationComponent } from './pages/show/show';
import { DeliveryDataComponent } from './components/delivery-data/delivery-data.component';
import { MedicalDataComponent } from './components/medical-data/medical-data.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { RequestComponent } from './components/request/request.component';
import { SuccessComponent } from './components/success/success.component';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThanksComponent } from './components/thanks/thanks.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { CoreModule } from '../core/core.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    ShowInformationComponent,
    DeliveryDataComponent,
    MedicalDataComponent,
    PaymentInfoComponent,
    RequestComponent,
    SuccessComponent,
    ThanksComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ProgressBarModule,
    InformationRoutingModule,
    AccordionModule.forRoot(),
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot()
  ]
})
export class InformationModule { }
