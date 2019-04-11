import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceDirective } from './directives/service.directive';
import { UserService } from './services/user.service';
import { PaymentService } from './services/payment.service';
import { HealthService } from './services/health.service';
import { RequestService } from './services/request.service';
import { CoverageService } from './services/coverage.service';
import { LocationService } from './services/location.service';
import { DependentService } from './services/dependent.service';

@NgModule({
  declarations: [NavBarComponent, FooterComponent,ServiceDirective],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [NavBarComponent, FooterComponent, FormsModule],
  providers: [
    UserService,
    PaymentService,
    HealthService,
    RequestService,
    LocationService,
    DependentService,
    CoverageService
  ]
})
export class CoreModule { }