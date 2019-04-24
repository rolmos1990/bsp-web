import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowInformationComponent } from './pages/show/show';
import { ThanksComponent } from './components/thanks/thanks.component';

const routes: Routes = [
  {
    path: '',
    component: ShowInformationComponent,
    pathMatch: 'full',
    data: { title: 'Banesco Seguros - Informacion del Cliente' }
  },
  {
    path: 'rechazo',
    component: ThanksComponent,
    pathMatch: 'full',
    data: { title: 'Banesco Seguros - Informacion del Cliente' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }