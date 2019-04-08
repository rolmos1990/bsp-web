import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bsp-client-info',
  templateUrl: './information.client-info.html',
  styleUrls: ['./information.client-info.scss']
})
export class InformationClientInfo implements OnInit{
  formulario: FormGroup;

  ngOnInit(){
    this.formulario = this.fb.group({
      formCardata: this.fb.group({
        'tipo_auto': this.fb.control(null),
        'marca': this.fb.control(null),
        'modelo': this.fb.control(null),
        'anio': this.fb.control(null),
        'precio': this.fb.control(null, [Validators.required]),
        'nuevo': this.fb.control(null),
      }),
      formClientdata: this.fb.group({
        'nombre': this.fb.control(null,Validators.compose([Validators.required, Validators.minLength(4)])),
        'apellido': this.fb.control(null,Validators.compose([Validators.required, Validators.minLength(4)])),
        'dia': this.fb.control(null,Validators.compose([Validators.required])),
        'mes': this.fb.control(null,Validators.compose([Validators.required])),
        'anio': this.fb.control(null,Validators.compose([Validators.required])),
        'tipo_doc': this.fb.control(null, [Validators.required]),
        'num_doc': this.fb.control(null, [Validators.required]),
        'masculino': this.fb.control(null),
        'femenino': this.fb.control(null),
        'est_civil': this.fb.control(null,[Validators.required]),
        'email': this.fb.control(null,[Validators.required, Validators.email]),
        'telefono': this.fb.control(null,[Validators.required]),
      })
    });
  }

  constructor(private fb: FormBuilder) {
  }
}
