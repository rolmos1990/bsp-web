import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { PoliciesRoutingModule } from './policies-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPolicies } from './pages/show/show.policies';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPipe } from '../core/pipes/search.pipe';
import { CoreModule } from '../core/core.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [ShowPolicies],
  imports: [
    CommonModule,
    CoreModule,
    NgbModule,
    TooltipModule.forRoot(),
    PoliciesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PoliciesModule { }
