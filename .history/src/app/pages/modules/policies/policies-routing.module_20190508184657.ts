import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowPolicies } from './pages/show/show.policies';

const routes: Routes = [
  {
    path: '',
    component: ShowPolicies,
    pathMatch: 'full',
    data: { title: 'Banesco Seguros' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
