import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowPayment } from './pages/show/show.payment';

const routes: Routes = [
  {
    path: '',
    component: ShowPayment,
    pathMatch: 'full',
    data: { title: 'Banesco Seguros' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
