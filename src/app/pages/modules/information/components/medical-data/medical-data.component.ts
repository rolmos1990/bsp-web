import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bsp-medical-data',
  templateUrl: './medical-data.component.html',
  styleUrls: ['./medical-data.component.scss']
})
export class MedicalDataComponent implements OnInit {

  @Input() formaMedical: FormGroup;

  constructor() {;
  }

  ngOnInit() {
  }

  inicio(){
    window.scrollTo(0,0);
  }

}
