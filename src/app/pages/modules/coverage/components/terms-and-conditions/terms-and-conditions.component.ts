import { Component } from '@angular/core';
import { TOTALDISABILITY, PARTIALDISABILITY } from '../../../core/utils/select.util';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'bsp-terms-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['../../pages/show/show.scss','./terms-and-conditions.scss']
})
export class TermsAndConditionsComponent {

  public totalDisability = TOTALDISABILITY;
  public partialDisability = PARTIALDISABILITY;
  public insureType = null;

  constructor(private _route: ActivatedRoute) {
    this.insureType = _route.snapshot.paramMap.get('insureType');
    console.log("INSURANCE TYPE", this.insureType);
  }

}
