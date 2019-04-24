import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApinfoRoutingModule } from './apinfo-routing.module';
import { ShowApinfo } from './pages/show/show.apinfo';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};


@NgModule({
  declarations: [ShowApinfo],
  imports: [
    CommonModule,
    ApinfoRoutingModule,
    AccordionModule.forRoot(),
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class ApinfoModule { }
