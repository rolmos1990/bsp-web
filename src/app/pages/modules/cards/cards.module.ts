import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { ShowCards } from './pages/show/show.cards';
import {TooltipModule} from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    ShowCards
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    TooltipModule
    
  ]
})
export class CardsModule { }
