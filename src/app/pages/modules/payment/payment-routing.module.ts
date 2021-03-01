import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowPaymentComponent } from './pages/show/show.payment';

const routes: Routes = [
  {
    path: '',
    component: ShowPaymentComponent,
    pathMatch: 'full',
    data: { title: 'Banesco Seguros' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
