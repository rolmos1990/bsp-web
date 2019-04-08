import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuotingRoutingModule } from './quoting-routing.module';
import { ShowComponent } from './pages/show/show';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [ShowComponent],
  imports: [
    CommonModule,
    QuotingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ]
})
export class QuotingModule { }
