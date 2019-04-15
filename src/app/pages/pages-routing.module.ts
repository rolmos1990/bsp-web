import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/landing-page/landing-page.module#LandingPageModule'
  },
  {
    path: 'payment',
    loadChildren: './modules/payment/payment.module#PaymentModule'
  },
  {
    path: 'general',
    loadChildren: './modules/general/general.module#GeneralModule'
  },
  {
    path: 'coverage/:userId',
    loadChildren: './modules/coverage/coverage.module#CoverageModule',
    pathMatch: 'full'
  },
  {
    path: 'quoting',
    loadChildren: './modules/quoting/quoting.module#QuotingModule'
  },
  {
    path: 'information/:requestId',
    loadChildren: './modules/information/information.module#InformationModule'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: 'insurance-detail',
    loadChildren: './modules/insurance-detail/insurance-detail.module#InsuranceDetailModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
