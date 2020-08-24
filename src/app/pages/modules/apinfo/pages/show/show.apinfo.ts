import { Component, ViewChild, OnInit, Injectable, HostListener } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { SLIDES, SLIDES_CANCER } from '../../../core/utils/select.util';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'bsp-show',
  templateUrl: './show.apinfo.html',
  styleUrls: ['./show.apinfo.scss']
})
@Injectable()
export class ShowApinfo implements OnInit {
  customClass = 'customClass';
  isFirstOpen = true;
  public slides = SLIDES;
  public greenActivate = '1';
  public insureType = null;

  public type: string = 'component';

  public disabled: boolean = false;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 30,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: {
      nextEl: '.derechaaa',
      prevEl: '.izquierdaaa',
    },
    pagination: false,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 70,
        slidesPerGroup: 3,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 50,
        slidesPerGroup: 2,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
        slidesPerGroup: 1,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerGroup: 1,
      }
    }
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  constructor(private _scrollToService: ScrollToService, private _route: ActivatedRoute){
    this.insureType = _route.snapshot.paramMap.get('insureType');
    this.insureType = this.insureType.replace("seguros-", "");
    if(this.insureType == "cancer"){
      this.slides = SLIDES_CANCER;
    }
  }

  ngOnInit() {

    window.scrollTo(0, 0);
  }

  public toggleDisabled() {
    this.disabled = !this.disabled;
  }

  public toggleDirection() {
    this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView() {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

  public toggleOverlayControls() {
    if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
    } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
    } else {
      this.config.scrollbar = false;
      this.config.pagination = false;

      this.config.navigation = true;
    }

    if (this.type === 'directive') {
      this.directiveRef.setIndex(0);
    } else {
      this.componentRef.directiveRef.setIndex(0);
    }
  }

  public toggleKeyboardControl() {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl() {
    this.config.mousewheel = !this.config.mousewheel;
  }

  public onIndexChange(index: number) {
  }
  public get _isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  @HostListener('window:scroll')
  public onBottom() {
    return window.scrollY && (window.scrollY >= 1580);
  }

  @HostListener('window:scroll')
  public showScrollButton() {
    return document.getElementById('scroll') && window.scrollY && (window.scrollY >= 315);
  }


}
