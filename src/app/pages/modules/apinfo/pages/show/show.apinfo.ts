import { Component, ViewChild, OnInit } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'bsp-show',
  templateUrl: './show.apinfo.html',
  styleUrls: ['./show.apinfo.scss']
})
export class ShowApinfo implements OnInit {
  customClass = 'customClass';
  isFirstOpen = true;

  public slides = [
    { 'titulo': 'Muerte accidental',
    'imagen' : 'unoapinfo',
    'mensaje': 'Si el asegurado muere en un accidente, a los beneficiarios se les pagará el monto asegurado que contrató (indemnización). Ejm: accidentes de tránsito, sucesos imprevistos, homicidios dolosos y culposos.' 
    },
    { 'titulo': 'Adelantos de gastos funerarios',
    'imagen' : 'dosapinfo',
    'mensaje': 'Adelantamos hasta el 25% la suma asegurada de gastos funerarios a los beneficiarios cuando ocurre la muerte accidental del asegurado. Ejm: si tu suma asegurada por muerte accidental es $10.000 te adelantamos hasta $2500' 
    },
    { 'titulo': 'Invalidez permanente',
    'imagen' : 'tresapinfo',
    'mensaje': 'Cubrimos un porcentaje según el grado de discapacidad que pudiera presentar el asegurado a causa de un accidente sufrido' 
    },
    { 'titulo': 'Gastos médicos por accidente',
    'imagen' : 'cuatroapinfo',
    'mensaje': 'Cobertura opcional donde te reembolsamos hasta un 10% de la suma asegurada para gastos médicos incurridos por accidentes.' 
    },
    { 'titulo': 'Doble indemnización por muerte por accidente específico',
    'imagen' : 'cincoapinfo',
    'mensaje': 'Duplicamos la suma asegurada por muerte accidental mientras el asegurado se transporta en un vehículo público (autobús, metro, taxi, etc) o si se ve envuelto en un incendio en algún edificio público (hotel, museo, cine, teatro, etc)' 
    },
    { 'titulo': 'Asistencia en viajes',
    'imagen' : 'seisapinfo',
    'mensaje': 'Asistencia médica durante tu viaje, si por indicación médica debes alojarte en un hotel, cubrimos tu estancia mientras te recuperas, transporte de los familiares del asegurado en caso necesario. Si ocurriera el fallecimiento del asegurado, traemos de vuelta sus restos así como a los familiares' 
    },
  ];

  public type: string = 'component';

  public disabled: boolean = false;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
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
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
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

  constructor(){}

  ngOnInit() {
  }

  public toggleType() {
    this.type = (this.type === 'component') ? 'directive' : 'component';
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
    console.log('Swiper index: ', index);
  }

}
