import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowLandingPage } from './pages/show/show.landing-page';

const routes: Routes = [
  {
    path: '',
    component: ShowLandingPage,
    pathMatch: 'full',
    data: { title: 'Banesco Seguros' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
