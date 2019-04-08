import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationClientInfo } from './pages/information/information.client-info';

const routes: Routes = [
  {
    path: '',
    component: InformationClientInfo,
    pathMatch: 'full',
    data: { title: 'Banesco Seguros - Informacion del Cliente' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientInfoRoutingModule { }
