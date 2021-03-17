import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizatedGuard } from './modules/core/guards/authorizated.guard';
import { PublicGuard } from './modules/core/guards/public.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/landing-page/landing-page.module#LandingPageModule'
  },
  {
    path: 'pago/:requestId',
    loadChildren: './modules/payment/payment.module#PaymentModule'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
    canActivate: [PublicGuard]
  },
  {
    path: 'general',
    loadChildren: './modules/general/general.module#GeneralModule'
  },
  {
    //path: 'cobertura/:insureType',
    path: 'MNXWEZLSOR2XEYI/:insureType',
    loadChildren: './modules/coverage/coverage.module#CoverageModule',
    pathMatch: 'full'
  },
  {
    path: 'cotizar/:requestId',
    loadChildren: './modules/quoting/quoting.module#QuotingModule'
  },
  {
    path: 'polizas',
    loadChildren: './modules/policies/policies.module#PoliciesModule',
    canActivate: [AuthorizatedGuard]
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
    path: 'informacion/:insureType',
    loadChildren: './modules/apinfo/apinfo.module#ApinfoModule'
  },
  {
    path: 'detalle/:requestId',
    loadChildren: './modules/insurance-detail/insurance-detail.module#InsuranceDetailModule',
    canActivate: [AuthorizatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
