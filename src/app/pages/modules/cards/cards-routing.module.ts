import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowCards } from './pages/show/show.cards';

const routes: Routes = [
  {
    path: '',
    component: ShowCards,
    pathMatch: 'full',
    data: { title: 'Banesco Seguros' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
