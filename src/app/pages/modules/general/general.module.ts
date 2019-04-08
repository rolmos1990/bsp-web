import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { ShowThanksGeneral } from './thanks/pages/show/show.thanks.general';
import { Show404Component } from './404/pages/show/show.404.general';

@NgModule({
  declarations: [ShowThanksGeneral, Show404Component],
  imports: [
    CommonModule,
    GeneralRoutingModule
  ]
})
export class GeneralModule { }
