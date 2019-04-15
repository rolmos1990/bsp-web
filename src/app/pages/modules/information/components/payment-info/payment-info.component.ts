import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment.service';
import { MONTHS, CARDNAME } from '../../../core/utils/select.util';
import { CustomValidatorDirective } from '../../../core/directives/validations/custom-validations.directive';

@Component({
  selector: 'bsp-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  public isFirstOpen: boolean = true;
  public customClass: string = 'customClass';
  public formaPayment: FormGroup;
  public cards = CARDNAME;
  public months = MONTHS;
  public isLoading: boolean;
  public years: Array<any> = [];
  @Input() requestId: string;
  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _fb: FormBuilder,
              private _paymentService: PaymentService) {}

  ngOnInit() {
    window.scrollTo(0,0);
    this.isLoading = true;
    this.generateForm();
  }

  public fillYearsList() {
    const date = new Date();
    for (let index = date.getFullYear(); index < (date.getFullYear() + 10); index++) {
      this.years.push(index);
    }
    this.isLoading = false;
  }

  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
  }

  public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
  }

  public assignPaymentCard() {
    this.markAllAsTouched();
    if (this.formaPayment.valid) {
      this.isLoading = true;
      let payload = this.formaPayment.value;
      payload.expireMonth = Number(payload.expireMonth);
      payload.expireYear = Number(payload.expireYear);
      payload.cardNumber = Number(payload.cardNumber);
      payload.cvv = Number(payload.cvv);
      this._paymentService.assignCreditcard(payload).subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
          this.nextStep.emit();
        },
        error => {
          console.log(error);
          this.isLoading = false;
          this.nextStep.emit();
        }
      );
    } else {
      console.log(this.formaPayment);
    }
  }

  public markAllAsTouched() {
    this.formaPayment.get('cardName').markAsTouched();
    this.formaPayment.get('cardNumber').markAsTouched();
    this.formaPayment.get('expireMonth').markAsTouched();
    this.formaPayment.get('expireYear').markAsTouched();
    this.formaPayment.get('cvv').markAsTouched();
  }

  public generateForm() {
    this.formaPayment = this._fb.group({
      'cardName': this._fb.control(null, [Validators.required, CustomValidatorDirective.fullNameValidator]),
      'cardNumber': this._fb.control(null, Validators.compose([Validators.required, CustomValidatorDirective.creditCardValidator])),
      'expireMonth': this._fb.control(null, [Validators.required]),
      'expireYear': this._fb.control(null, [Validators.required]),
      'cvv': this._fb.control(null, Validators.compose([Validators.required, CustomValidatorDirective.cvvValidator])),
      'requestId': this._fb.control(this.requestId)
    });
    this.fillYearsList();
  }

}
