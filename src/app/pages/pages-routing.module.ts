import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/landing-page/landing-page.module#LandingPageModule'
  },
  {
    path: 'pago',
    loadChildren: './modules/payment/payment.module#PaymentModule'
  },
  {
    path: 'general',
    loadChildren: './modules/general/general.module#GeneralModule'
  },
  {
    path: 'cobertura/:userId',
    loadChildren: './modules/coverage/coverage.module#CoverageModule',
    pathMatch: 'full'
  },
  {
    path: 'cotizar',
    loadChildren: './modules/quoting/quoting.module#QuotingModule'
  },
  {
    path: 'formulario/:requestId',
    loadChildren: './modules/information/information.module#InformationModule'
  },
  {
    path: 'ingreso',
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: 'informacion',
    loadChildren: './modules/apinfo/apinfo.module#ApinfoModule'
  },
  {
    path: 'detalle',
    loadChildren: './modules/insurance-detail/insurance-detail.module#InsuranceDetailModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
