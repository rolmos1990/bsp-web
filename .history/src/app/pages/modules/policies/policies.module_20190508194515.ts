import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { PoliciesRoutingModule } from './policies-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPolicies } from './pages/show/show.policies';

@NgModule({
  declarations: [ShowPolicies],
  imports: [
    CommonModule,
    PoliciesRoutingModule
  ],
  providers: [DecimalPipe]
})
export class PoliciesModule { }
