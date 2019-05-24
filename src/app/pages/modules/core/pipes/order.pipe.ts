import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coveragesSort'
})

export class CoveragesSortPipe implements PipeTransform {

  transform(coverages: Array<any>): any[] {
    let _coverages = [];

    if (this._isMobile || this.isMobile) {
      _coverages.push(this.getRecommended(coverages));
      coverages.forEach(coverage => {
        if (this.getRecommended(coverages) !== coverage) {
          _coverages.push(coverage);
        }
      });
    } else {
      _coverages = coverages;
    }
    return _coverages;
  }

  get isMobile() {
    return window.screen.width <= 900 || window.screen.availHeight <= 900;
  }

  get _isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  getRecommended(coverages: Array<any>): any {
    return coverages.find(obj => {return obj.recommended});
  }
  
  }
