import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { PoliciesRoutingModule } from './policies-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPolicies } from './pages/show/show.policies';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ShowPolicies],
  imports: [
    CommonModule,
    NgbModule,
    PoliciesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PoliciesModule { }
