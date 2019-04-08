import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bsp-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  @Input() formaPayment: FormGroup;

  constructor() {}

  mostrar(){
    console.log(this.formaPayment);
  }

  ngOnInit() {
    window.scrollTo(0,0);
  }
  isFirstOpen: boolean = true;
  customClass: string = 'customClass';

}
