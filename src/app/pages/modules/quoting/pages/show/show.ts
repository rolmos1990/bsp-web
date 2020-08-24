import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../../../core/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidatorDirective } from '../../../core/directives/validations/custom-validations.directive';
import { ActivityService } from '../../../core/services/activities.service';
import { DEDUCTIBLES } from '../../../core/utils/select.util';

@Component({
  selector: 'bsp-show',
  templateUrl: './show.html',
  styleUrls: ['./show.scss']
})


export class ShowComponent implements OnInit {

  public forma: FormGroup;
  public invalidRadioSelect = false;
  public isLoading: boolean;
  //public ocupaciones: Array<any> = [];
  private occupations: Array<any> = [];
  public deductibles = DEDUCTIBLES;
  public flag1: boolean = true;
  public flag2: boolean = false;
  public flag3: boolean = false;
  public flag4: boolean = false;
  public flag5: boolean = false;
  private insureType: string = "accidentes-personales";
  private requestId: string;


  constructor(
    public fb: FormBuilder, private _requestService: RequestService, private _router: Router, private _activityService: ActivityService, private _route: ActivatedRoute) {
    this.isLoading = true;
    this.requestId = _route.snapshot.paramMap.get('requestId');
  }

  ngOnInit() {
    this.initForm();
    this.redirectInsureNotExist(this.requestId);
  }

  redirectInsureNotExist(requestId: string) {
    this._requestService.getRequest(requestId).subscribe(
      response => {
        if(response.result.request.id){
          this.insureType = response.result.request.insurance.type;
          this.isLoading = false;
        }
        else{
          this.isLoading = true;
          this._router.navigate([`/`]);
        }
      },
      error => {
        this.isLoading = true;
        this._router.navigate([`/`]);
      }
    );
  }

  // private getOccupations() {
  //   this._activityService.getAllOcupations().subscribe(
  //     response => {
  //       this.occupations = response.result.occupations;
  //       this.occupations.forEach(occupation => {
  //         this.ocupaciones.push(occupation.name);
  //       });
  //       this.isLoading = false;
  //     },
  //     error => {
  //       console.log(error);
  //       this.isLoading = false;
  //     }
  //   );
  // }

  // private getOccupation(occupationName: string) {
  //   return this.occupations.find(obj => { return occupationName === obj.name });
  // }

  public validations() {
    if (this.forma.value.documentType === 'Pasaporte') {
      this.forma.get('document').setValidators(Validators.compose([Validators.required, CustomValidatorDirective.documentValidator]));
      this.forma.get('document2').clearValidators();
      this.forma.get('document3').clearValidators();
      this.forma.get('document').updateValueAndValidity();
      this.forma.get('document2').updateValueAndValidity();
      this.forma.get('document3').updateValueAndValidity();
      this.forma.updateValueAndValidity();
    } else {
      this.forma.get('document').setValidators(Validators.compose([Validators.required, CustomValidatorDirective.shortDocumentValidator]));
      this.forma.get('document2').setValidators(Validators.compose([Validators.required, Validators.maxLength(4), CustomValidatorDirective.RegularNumbersPositive]));
      this.forma.get('document3').setValidators(Validators.compose([Validators.required, Validators.maxLength(6), CustomValidatorDirective.RegularNumbersPositive]));
      this.forma.get('document').updateValueAndValidity();
      this.forma.get('document2').updateValueAndValidity();
      this.forma.get('document3').updateValueAndValidity();
      this.forma.updateValueAndValidity();
    }
  }

  private initForm() {
    this.forma = this.fb.group({
      documentType: ['Cedula', Validators.required],
      document: [null],
      document2: [null],
      document3: [null],
      //occupationId: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      //birthday: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.min(18), Validators.max(60)])],
      email: ['', Validators.compose([Validators.required, CustomValidatorDirective.customEmailValidator])],
      //same: [null, Validators.required]
    });
    //this.getOccupations();
    this.validations();
  }

  public submit() {
    if (this.forma.valid) {
      this.isLoading = true;
      this.invalidRadioSelect = false;
      let payload = this.forma.value;
      if (payload.documentType !== 'Pasaporte') {
        payload.document = payload.document.concat('-').concat(payload.document2).concat('-').concat(payload.document3);
      }
      delete payload.document2;
      delete payload.document3;

      //payload.occupationId = this.getOccupation(payload.occupationId).id;
      payload.requestId = this.requestId;
      localStorage.setItem('same', payload.same ? 'true' : 'false');
      payload.type = 'cliente';
      this._requestService.saveRequest(payload, this.insureType).subscribe(
        response => {
          this._router.navigate(['formulario', this.requestId]);
        }, error => {
          console.error("[quoting.pages.show]", error);
          this.isLoading = false;
        }
      );
    } else {
      this.invalidRadioSelect = true;
    }
  }


  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
  }
  public invalidRadio(controlName: string, form: FormGroup) {
    return !form.get(controlName).valid;
  }
  public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
  }

  public selectEvent(item) {
  }

  public onChangeSearch(val: string) {
  }

  public onFocused(e) {
  }

  // public hide1(): void {
  //   this.flag1 = false;
  //   this.flag2 = true;
  // }

  // public hide2(): void {
  //   this.flag2 = false;
  //   this.flag3 = true;
  // }

  // public atras2(): void {
  //   this.flag2 = false;
  //   this.flag1 = true;
  // }


}
