import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
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
  public isLoading: boolean;
  public ocupaciones: Array<any> = [];
  private occupations: Array<any> = [];
  public deductibles = DEDUCTIBLES;
  public flag1: boolean = true;
  public flag2: boolean = false;
  public flag3: boolean = false;
  public flag4: boolean = false;
  public flag5: boolean = false;


  constructor(
    public fb: FormBuilder, private _userService: UserService, private _router: Router, private _activityService: ActivityService) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.initForm();
  }

  private getOccupations() {
    this._activityService.getAllOcupations().subscribe(
      response => {
        this.occupations = response.result.occupations;
        this.occupations.forEach(occupation => {
          this.ocupaciones.push(occupation.name);
        });
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

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
      documentType: [null, Validators.required],
      document: [null],
      document2: [null],
      document3: [null],
      occupationId: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      birthday: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.min(18), Validators.max(60)])],
      email: ['', Validators.compose([Validators.required, CustomValidatorDirective.customEmailValidator])],
      same: [true, Validators.required]
    });
    this.getOccupations();
  }

  private getOccupation(occupationName: string) {
    return this.occupations.find(obj => {return occupationName === obj.name});
  }

  public submit() {
    if (this.forma.valid) {
      this.isLoading = true;
      let payload = this.forma.value;
      if (payload.documentType !== 'Pasaporte') {
        payload.document = payload.document.concat('-').concat(payload.document2).concat('-').concat(payload.document3);
      }
      delete payload.document2;
      delete payload.document3;
      payload.occupationId = this.getOccupation(payload.occupationId).id;
      localStorage.setItem('same', payload.same ? 'true' : 'false');
      payload.type = 'cliente';
      this._userService.createUser(payload).subscribe(
        response => {
          this._router.navigate(['cobertura', response.result.user.id]);
        }, error => {
          console.error(error);
          this.isLoading = false;
        }
      );
    }
  }


  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
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

  public hide1(): void {
    this.flag1 = false;
    this.flag2 = true;
  }

  public hide2(): void {
    this.flag2 = false;
    this.flag3 = true;
  }

  public hide3(): void {
    this.flag3 = false;
    this.flag4 = true;
  }

  public hide4(): void {
    this.flag4 = false;
    this.flag5 = true;
  }

  public atras2(): void {
    this.flag2 = false;
    this.flag1 = true;
  }

  public atras3(): void {
    this.flag3 = false;
    this.flag2 = true;
  }

  public atras4(): void {
    this.flag4 = false;
    this.flag3 = true;
  }

  public atras5(): void {
    this.flag5 = false;
    this.flag4 = true;
  }


}
