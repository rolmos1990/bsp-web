import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoverageRoutingModule } from './coverage-routing.module';
import { ShowComponent } from './pages/show/show';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CoreModule } from '../core/core.module';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [ShowComponent, TermsAndConditionsComponent],
  imports: [
    CommonModule,
    CoverageRoutingModule,
    CoreModule,
    AccordionModule.forRoot()
  ]
})
export class CoverageModule { }
