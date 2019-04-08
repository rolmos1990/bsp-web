import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bsp-car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.scss']
})
export class CarDataComponent implements OnInit{
  @Input() formCardata: FormGroup;

  constructor() {}

  ngOnInit(){}
}
