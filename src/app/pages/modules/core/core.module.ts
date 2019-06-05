import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceDirective } from './directives/service.directive';
import { UserService } from './services/user.service';
import { PoliciesService } from './services/policies.service';
import { PaymentService } from './services/payment.service';
import { HealthService } from './services/health.service';
import { RequestService } from './services/request.service';
import { CoverageService } from './services/coverage.service';
import { LocationService } from './services/location.service';
import { DependentService } from './services/dependent.service';
import { ActivityService } from './services/activities.service';
import { CustomValidatorDirective } from './directives/validations/custom-validations.directive';
import { BspLoaderComponent } from './components/bsp-loader/bsp-loader.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CoveragesSortPipe } from './pipes/order.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { AuthorizatedGuard } from './guards/authorizated.guard';
import { PublicGuard } from './guards/public.guard';
import { ExcelService } from './services/excel.service';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    BspLoaderComponent,
    ServiceDirective,
    CustomValidatorDirective,
    CoveragesSortPipe,
    SearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot()
  ],
  exports: [NavBarComponent, FooterComponent, BspLoaderComponent, FormsModule, CoveragesSortPipe, SearchPipe],
  providers: [
    UserService,
    PoliciesService,
    PaymentService,
    HealthService,
    RequestService,
    ExcelService,
    LocationService,
    DependentService,
    ActivityService,
    CoverageService,
    AuthorizatedGuard,
    PublicGuard
  ]
})
export class CoreModule { }