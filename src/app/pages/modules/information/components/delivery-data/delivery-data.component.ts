import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment.service';
import { SCHEDULES } from '../../../core/utils/select.util';
import { NotifierService } from 'angular-notifier';
import { RequestService } from '../../../core/services/request.service';

@Component({
  selector: 'bsp-delivery-data',
  templateUrl: './delivery-data.component.html',
  styleUrls: ['./delivery-data.component.scss']
})
export class DeliveryDataComponent implements OnInit {

  public formaDelivery: FormGroup;
  public schedules = SCHEDULES;
  public disabled = false;
  public date;
  @Input() requestId: string;
  @Input() request: any;
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() success: EventEmitter<any> = new EventEmitter<any>();
  @Output() previousStep: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _fb: FormBuilder,
    private _paymentService: PaymentService,
    private _toastr: NotifierService) {
  }

  ngOnInit() {
    // window.scrollTo(0, 0);
    // this.generateDeliveryForm();
    // this.getRequest();
    this.date = new Date();
  }

  public generateDeliveryForm() {
    this.formaDelivery = this._fb.group({
      'placeDescription': this._fb.control(null, [Validators.required]),
      'livingPlace': this._fb.control(null, [Validators.required]),
      'deliverTime': this._fb.control(null, [Validators.required]),
      'referencePoint': this._fb.control(null, [Validators.required]),
      'requestId': this._fb.control(this.requestId),
    })
  }

  public markAllAsTouched() {
    this.formaDelivery.get('placeDescription').markAsTouched();
    this.formaDelivery.get('livingPlace').markAsTouched();
    this.formaDelivery.get('deliverTime').markAsTouched();
    this.formaDelivery.get('referencePoint').markAsTouched();
  }

  public validateForm() {
    if (this.formaDelivery.get('livingPlace').value === 'Vivienda') {
      this.formaDelivery.get('placeDescription').clearValidators();
      this.formaDelivery.get('placeDescription').updateValueAndValidity();
      this.formaDelivery.get('placeDescription').updateValueAndValidity();
      this.formaDelivery.get('placeDescription').setValue(null);

    } else {
      this.formaDelivery.get('placeDescription').setValidators(Validators.required);
      this.formaDelivery.get('placeDescription').updateValueAndValidity();
      this.formaDelivery.get('placeDescription').updateValueAndValidity();
    }
    this.formaDelivery.updateValueAndValidity();
  }

  public saveDeliveryData() {
    this.markAllAsTouched();
    this.validateForm();
    if (this.formaDelivery.valid) {
      //if (true) {
      this.isLoading.emit(true);
      this._paymentService.assignDeliverInformation(this.formaDelivery.value).subscribe(
        response => {
          this.success.emit();
          this.isLoading.emit(false);
        },
        error => {
          this.isLoading.emit(false);
        }
      )

    } else {
      this._toastr.notify('error', 'Faltan campos por completar. Por favor, revise y vuelva a enviar el formulario.');
    }
  }

  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
  }

  public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
  }

  public previus() {
    this.previousStep.emit();

  }

  continuar() {
    this.isLoading.emit(true);
    this._paymentService.finishRequest({ requestId: this.requestId }).subscribe(
      response => {
        this.success.emit();
        this.isLoading.emit(false);
      },
      error => {
        this.isLoading.emit(false);
      }
    )
  }

}
