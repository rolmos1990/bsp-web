import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'bsp-show-insurance-detail',
  templateUrl: './show.insurance-detail.html',
  styleUrls: ['./show.insurance-detail.scss']
})
export class ShowInsuranceDetailComponent implements OnInit {
  public isFirstOpen = true;
  public customClass: string = 'customClass';

  constructor() {
               }

  ngOnInit() {
  }

}
