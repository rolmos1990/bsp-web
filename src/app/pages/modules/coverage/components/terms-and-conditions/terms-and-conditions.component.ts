import { Component } from '@angular/core';
import { TOTALDISABILITY, PARTIALDISABILITY } from '../../../core/utils/select.util';

@Component({
  selector: 'bsp-terms-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['../../pages/show/show.scss']
})
export class TermsAndConditionsComponent {

  public totalDisability = TOTALDISABILITY;
  public partialDisability = PARTIALDISABILITY;

  constructor() {
  }

}
