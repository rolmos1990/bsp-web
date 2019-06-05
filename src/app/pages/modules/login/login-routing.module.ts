import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowComponent } from './pages/show/show.login';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ShowComponent,
    pathMatch: 'full',
    data: { title: 'Banesco Seguros' }
  },
  {
    path: 'recuperar_clave',
    pathMatch: 'full',
    component: ForgotPasswordComponent,
    data: { title: 'Banesco Seguros' }
  },
  {
    path: 'cambio_clave/:tokenId',
    pathMatch: 'full',
    component: ChangePasswordComponent,
    data: { title: 'Banesco Seguros' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
