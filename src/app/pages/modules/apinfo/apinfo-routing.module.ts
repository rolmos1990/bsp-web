import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowApinfo } from './pages/show/show.apinfo';

const routes: Routes = [
  {
    path: '',
    component: ShowApinfo,
    data: { title: 'Banesco Seguros' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApinfoRoutingModule { }
