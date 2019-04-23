import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApinfoRoutingModule } from './apinfo-routing.module';
import { ShowApinfo } from './pages/show/show.apinfo';

@NgModule({
  declarations: [ShowApinfo],
  imports: [
    CommonModule,
    ApinfoRoutingModule
  ]
})
export class ApinfoModule { }
