import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bsp-delivery-data',
  templateUrl: './delivery-data.component.html',
  styleUrls: ['./delivery-data.component.scss']
})
export class DeliveryDataComponent implements OnInit {
  @Input() formaDelivery: FormGroup;

  constructor() { }

  ngOnInit() {
    window.scrollTo(0,0);
  }

}
