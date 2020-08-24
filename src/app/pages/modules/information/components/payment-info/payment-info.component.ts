import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment.service';
import { RequestService } from '../../../core/services/request.service';
import { MONTHS, CARDNAME } from '../../../core/utils/select.util';
import { CustomValidatorDirective } from '../../../core/directives/validations/custom-validations.directive';
import { NotifierService } from 'angular-notifier';
import { ShowService } from '../../pages/show/show.service';
import { pipeDef } from '@angular/core/src/view';

@Component({
  selector: 'bsp-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent {
  public isFirstOpen: boolean = true;
  public customClass: string = 'customClass';
  public formaPayment: FormGroup;
  public cards = CARDNAME;
  public disabled = false;
  public months = MONTHS;
  public selectedBy = null;
  public invalidForm = false;
  public payment: any;
  public creditCardsList;
  public date;
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  public years: Array<any> = [];
  @Input() requestId: string;
  @Input() request: any;
  @Input() insureType: any;
  @Input() paymentInformation: any;
  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();
  @Output() previousStep: EventEmitter<any> = new EventEmitter<any>();

  @Output() success: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _fb: FormBuilder, private _paymentService: PaymentService, private _showService: ShowService,
    private _requestService: RequestService, private _toastr: NotifierService) {
    this._showService.changeToCreditCard.subscribe(values => {
      this.getRequest();
    });
  }

  ngOnInit() {
    this.date = new Date();
  }

  public fillYearsList() {
    const date = new Date();
    for (let index = date.getFullYear(); index < (date.getFullYear() + 10); index++) {
      this.years.push(index);
    }
  }

  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
  }

  public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
  }

  public getRequest() {
    this.isLoading.emit(true);
    this._requestService.getRequest(this.requestId).subscribe(
      response => {
        this.payment = response.result.request.insurance.coverageDetail;
        let documentInfo = response.result.request.insured;
        this.getClientByDocument(documentInfo);
      },
      error => {
        this.isLoading.emit(false);
      }
    );
  }

  public doPayment() {
    console.log("PAYMENT INFORMATION", this.paymentInformation);
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", this.paymentInformation['processingUrl']) 
    
    const arrayObj = this.paymentInformation || [];
   
   const _items = Object.entries(arrayObj).map((e) => { 
    if(e[0] !== "processingUrl" && e[0] !== "status" && e[0] !== "message" && e[0] !== "id"){
      const value = ((typeof e[1] == "string") ? e[1]: e[1] + "");
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", e[0]);
      hiddenField.setAttribute("value", value );
      form.appendChild(hiddenField);
      }
    });

    document.body.appendChild(form);
    form.submit();
  }

  public continuar() {
    if (this.selectedBy) {
      this.isLoading.emit(true);
      //let targetInformation = this.selectedBy.split(';');
      let payload = { expireMonth: null, expireYear: null, cardNumber: null, requestId: null };
      payload.expireMonth = Number('12');
      payload.expireYear = Number('2020');
      payload.cardNumber = Number(this.selectedBy.split('*').join('').trim());
      payload.requestId = this.requestId;
      this._paymentService.assignCreditcard(payload).subscribe(
        response => {
          this.nextStep.emit();
          this.isLoading.emit(false);
        },
        error => {
          this.isLoading.emit(false);
        }
      );
      // this.nextStep.emit();
      // this.isLoading.emit(false);
    } else {
      this.invalidForm = true;
    }
  }

  public assignPaymentCard() {
    this.markAllAsTouched();
    if (this.formaPayment.valid) {
      //if (true) {
      this.isLoading.emit(true);
      let payload = this.formaPayment.value;
      payload.expireMonth = Number(payload.expireMonth);
      payload.expireYear = Number(payload.expireYear);
      payload.cardNumber = Number(payload.cardNumber);
      this._paymentService.assignCreditcard(payload).subscribe(
        response => {
          this.nextStep.emit();
          this.isLoading.emit(false);
        },
        error => {
          this.isLoading.emit(false);
        }
      );
    } else {
      this._toastr.notify('error', 'Faltan campos por completar. Por favor, revise y vuelva a enviar el formulario.');
    }
  }

  public markAllAsTouched() {
    this.formaPayment.get('cardName').markAsTouched();
    this.formaPayment.get('cardNumber').markAsTouched();
    this.formaPayment.get('expireMonth').markAsTouched();
    this.formaPayment.get('expireYear').markAsTouched();
  }

  public generateForm() {
    this.formaPayment = this._fb.group({
      'cardName': this._fb.control(null, [Validators.required, CustomValidatorDirective.fullNameValidator]),
      'cardNumber': this._fb.control(null,
        Validators.compose([Validators.required,
        CustomValidatorDirective.creditCardValidator,
        Validators.maxLength(16)])),
      'expireMonth': this._fb.control(null, [Validators.required]),
      'expireYear': this._fb.control(null, [Validators.required]),
      'requestId': this._fb.control(this.requestId)
    });
    this.fillYearsList();
  }
  public previus() {
    this.previousStep.emit();
  }
  public getClientByDocument(documentInfo) {
    if (documentInfo) {
      this.isLoading.emit(true);
      const payloadDocument = {
        document: this.formatDocument(documentInfo)
      };
      this._paymentService.getClientByDocument(payloadDocument).subscribe(
        response => {
          this.creditCardsList = response.result.client.creditCard;

          this.isLoading.emit(false);
        },
        error => {
          this.isLoading.emit(false);
        }
      );
    }
  }

  public formatDocument(documentInfo: any): any {
    if (documentInfo && documentInfo.documentType && documentInfo.document) {
      const document = documentInfo.document.split('-');
      let newDocument = '';
      document.forEach(element => {
        newDocument = newDocument + element.toUpperCase().trim();
      });
      switch (documentInfo.documentType) {
        case 'Cedula':
          return newDocument;
          break;
        case 'Pasaporte':
          return ('P' + newDocument);
          break;
        default:
          return '';
          break;
      }
    }
  }

  public getInsuredName(_request) {
    if (!_request) {
      return "";
    }
    const insured = (_request && _request.result && _request.result.insured) || {};
    return `${insured.name || ""} ${insured.secondName || ""} ${insured.lastName || ""} ${insured.secondLastName || ""}`;
  }
}
