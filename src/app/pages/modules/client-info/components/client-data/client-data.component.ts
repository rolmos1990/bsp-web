import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bsp-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent implements OnInit{
  @Input() formClientdata: FormGroup;

  guardar(){
    console.log(this.formClientdata);
  }

  constructor() {}

  ngOnInit(){}
}
