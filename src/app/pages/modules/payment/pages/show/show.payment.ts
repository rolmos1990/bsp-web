import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'bsp-payment',
  templateUrl: './show.payment.html',
  styleUrls: ['./show.payment.scss']
})
export class ShowPayment implements OnInit{

  forma: FormGroup;

  constructor(
    public fb: FormBuilder, private router:Router) {
    this.forma = this.fb.group({
      cardNumber: ['', Validators.compose([Validators.required, Validators.maxLength(16)]) ],
      cardName: ['', Validators.compose([Validators.required, Validators.minLength(4) ]) ],
      expireMonth: ['', Validators.compose([Validators.required, Validators.maxLength(2) ]) ],
      expireYear: ['', Validators.compose([Validators.required, Validators.maxLength(2) ]) ],
      cvv: ['', Validators.compose([Validators.required, Validators.maxLength(3) ]) ],
      city: ['', Validators.compose([Validators.required, Validators.minLength(4) ]) ],
      address: ['', Validators.compose([Validators.required ]) ]
    });
  }

  guardarCambios(){
  }

  navegarThanks(){
    this.router.navigate(['thanks']);
  }

  ngOnInit(){
    $(document)
    .one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
        this.rows = minRows + rows;
    });
  }
}
