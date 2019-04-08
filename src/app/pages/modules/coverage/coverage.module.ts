import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoverageRoutingModule } from './coverage-routing.module';
import { ShowComponent } from './pages/show/show';

import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [ShowComponent],
  imports: [
    CommonModule,
    CoverageRoutingModule,
    AccordionModule.forRoot()
  ]
})
export class CoverageModule { }
