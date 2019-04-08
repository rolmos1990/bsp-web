import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowThanksGeneral } from './thanks/pages/show/show.thanks.general';
import { Show404Component } from './404/pages/show/show.404.general';

const routes: Routes = [
  {
    path: 'thanks',
    component: ShowThanksGeneral,
    pathMatch: 'full'
  },
  {
    path: '404',
    component: Show404Component,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
