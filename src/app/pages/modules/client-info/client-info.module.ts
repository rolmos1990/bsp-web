import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientInfoRoutingModule } from './client-info-routing.module';
import { InformationClientInfo } from './pages/information/information.client-info';
import { CarDataComponent } from './components/car-data/car-data.component';
import { ClientDataComponent } from './components/client-data/client-data.component';
import {TabsModule} from 'ngx-tabset';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    InformationClientInfo,
    CarDataComponent,
    ClientDataComponent
  ],
  imports: [
    CommonModule,
    ClientInfoRoutingModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientInfoModule { }
