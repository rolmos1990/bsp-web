import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { CoverageRoutingModule } from '../coverage/coverage-routing.module';
import { ApinfoRoutingModule } from './apinfo-routing.module';
import { ShowApinfo } from './pages/show/show.apinfo';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { CoreModule } from '../core/core.module';
//import { ShowComponent } from '../coverage/pages/show/show';
import { TermsAndConditionsComponent } from '../coverage/components/terms-and-conditions/terms-and-conditions.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};


@NgModule({
  declarations: [ShowApinfo, TermsAndConditionsComponent],
  imports: [
    CommonModule,
    ApinfoRoutingModule,
    AccordionModule.forRoot(),
    ScrollToModule.forRoot(),
    SwiperModule,
    CoreModule,
    //CoverageRoutingModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class ApinfoModule { }
