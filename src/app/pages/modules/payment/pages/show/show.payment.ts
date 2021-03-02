import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RequestService} from '../../../core/services/request.service';
import {CustomValidatorDirective} from '../../../core/directives/validations/custom-validations.directive';
import {PaymentService} from '../../../core/services/payment.service';
//import {ShowService} from '../../../information/pages/show/show.service';
import * as moment from 'moment';

@Component({
  selector: 'bsp-show',
  templateUrl: './show.payment.html',
  styleUrls: ['./show.payment.scss']
})
export class ShowPaymentComponent implements OnInit {

  public requestId: string;
  public request: any = null;
  public isLoading: boolean;
  public insureType: string;
  public errorMessage: string = null;
  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _paymentService: PaymentService,
    private _requestService: RequestService,
    //private _showService: ShowService,
    private _router: Router,
    private _route: ActivatedRoute) {

    this.requestId = _route.snapshot.paramMap.get('requestId');
    this.isLoading = true;

    this.forma = this.fb.group({
      cardNumber: ['', Validators.compose([Validators.required, CustomValidatorDirective.creditCardValidatorWithSpaces])],
      cardName: ['', Validators.compose([Validators.required, Validators.minLength(4), CustomValidatorDirective.leastOneSpace])],
      expireDate: ['', Validators.compose([CustomValidatorDirective.dateExpiryValidator])],
      cvv: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])],
      address: ['', Validators.compose([Validators.required, Validators.maxLength(200)])]
    });

    this.redirectInsureNotExist(this.requestId);
  }

  ngOnInit() {

  }

  redirectInsureNotExist(requestId: string) {
    this._requestService.getRequest(requestId).subscribe(
      response => {
        console.log("response", response);
        const _request = response.result.request;
        if (_request.id && ['Iniciada', 'Recibida'].includes(_request.status)) {
          this.insureType = _request.insurance.insuranceType;
          this.request = _request;
          this.isLoading = false;
        } else {
          this.isLoading = true;
          this._router.navigate([`/`]);
        }
      },
      error => {
        console.log("error reported", error);
        this.isLoading = true;
        this._router.navigate([`/`]);
      }
    );
  }

  public markAllAsTouched() {
    this.forma.get('cardNumber').markAsTouched();
    this.forma.get('cardName').markAsTouched();
    this.forma.get('expireDate').markAsTouched();
    this.forma.get('cvv').markAsTouched();
    this.forma.get('address').markAsTouched();
  }

  public previus(){
    const requestObject = this.request;
    this._router.navigate([`/formulario/${requestObject.id}`]);
  }

  public submitPayment(){
    this.markAllAsTouched();
    if (this.forma.valid) {
      this.errorMessage = null;
      this.isLoading = true;
      const PROVIDER_STATUS = {
        ACCEPTED : "SUCCESSFUL",
        DECLINE: "DENIED"
      };

      const requestObject = this.request;
      const insured = requestObject.insured;

      const form = this.forma.value;
      const expirationDateObj = moment(form.expireDate, 'MM/YY');

      const name = form.cardName.substr(0,form.cardName.indexOf(' '));
      const lastname = form.cardName.substr(form.cardName.indexOf(' ')+1);

      const buildedPayment = {
        requestId: requestObject.id,
        paymentInformation: {
          cardNumber: form.cardNumber,
          expirationDate: expirationDateObj.format("YYYY-MM"),
          cvv: form.cvv,
          cardFirstName: name,
          cardLastName: lastname,
          email: insured.email,
          phone: insured.cellphone,
          address: insured.street
        }
      };

      this._paymentService.makePayment(buildedPayment).subscribe(
        rsp => {
           const response = rsp.result || {};
           if(response.status === PROVIDER_STATUS.ACCEPTED){
              //pago exitoso
             this._router.navigate([`/formulario/${buildedPayment.requestId}/receipt`]);
           }
           else if(response.status === PROVIDER_STATUS.DECLINE){
             //error
             const providerMessage = response && response.paymentProvider && response.paymentProvider.message;
             const message = PROVIDER_STATUS.DECLINE ? `Su pago ha sido rechazado. Motivo: ${providerMessage}` : "No hemos podido procesar el pago.";

             this.errorMessage = message;
           }
           else{
             const message = "No hemos podido procesar el pago.";
             this.errorMessage = message;
           }
          this.isLoading = false;
        },
        error => {
            //error
          const paymentProviderMessage = "Se ha producido un error con el pago";
          this.isLoading = false;

          this.errorMessage = paymentProviderMessage;
        }
      );
    } else {
      this.isLoading = false;
      const paymentProviderMessage = "Se ha producido un error con el pago";
      this.isLoading = false;

      this.errorMessage = paymentProviderMessage;
    }

  }

}
