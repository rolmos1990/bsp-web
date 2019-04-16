import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuotingRoutingModule } from './quoting-routing.module';
import { ShowComponent } from './pages/show/show';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ShowComponent],
  imports: [
    CommonModule,
    QuotingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    CoreModule
  ]
})
export class QuotingModule { }
