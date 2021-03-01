import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { ShowPaymentComponent } from './pages/show/show.payment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgxMaskModule} from 'ngx-mask';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    ShowPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    NgxMaskModule.forRoot()
  ]
})
export class PaymentModule { }
