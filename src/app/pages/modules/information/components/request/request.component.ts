import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DOCUMENTS, MONTHLYINCOME, CIVILSTATUS, PARENTESCOS, BENEFICIARIOS, DEPORTES } from '../../../core/utils/select.util';
import { LocationService } from '../../../core/services/location.service';
import { RequestService } from '../../../core/services/request.service';
import { DependentService } from '../../../core/services/dependent.service';
import * as moment from 'moment';
import { ActivityService } from '../../../core/services/activities.service';
import { CustomValidatorDirective } from '../../../core/directives/validations/custom-validations.directive';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'bsp-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  public customClass: string = 'customClass';
  public percentsChecked: boolean;
  public isFirstOpen: boolean = true;
  public modalForm: FormGroup;
  public documents = DOCUMENTS;
  public beneficiarios = BENEFICIARIOS;
  public deportes = DEPORTES;
  public parentescos = PARENTESCOS;
  public incomes = MONTHLYINCOME;
  public civilStatus = CIVILSTATUS;
  public loader = false;
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  public edit: boolean;
  public nationalities: Array<any>;
  public provinces: Array<any>;
  public districtsCont: Array<any>;
  public corregimientosCont: Array<any>;
  public districtsInsu: Array<any>;
  public corregimientosInsu: Array<any>;
  public occupations: Array<any>;
  public forma: FormGroup;
  @Input() requestId: string;
  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();
  content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';

  constructor(private _modalService: NgbModal,
              private _fb: FormBuilder,
              private _toastr: NotifierService,
              private _locationService: LocationService,
              private _activityService: ActivityService,
              private _requestService: RequestService,
              private _dependentService: DependentService) {
                this.edit = false;
                this.percentsChecked = false;
  }

  ngOnInit() {
    this.getProvinces();
  }

  public getRequest() {
    this._requestService.getRequest(this.requestId).subscribe(
      response => {
        console.log(response);
        this.fillMainForm(response.result.request.contractor, response.result.request.insured);
        this.getDependents();
      },
      error => {
        console.log(error);
        this.isLoading.emit(false);
      }
    );
  }

  public getCorregimientos(cont: boolean, first?: boolean) {
    this._locationService.getAllCorregimientos(cont ? this.forma.value.contDistrictId : this.forma.value.insuDistrictId).subscribe(
      response => {
        if (cont) {
          if (!first) {
            this.forma.value.contCorregimientoId = null;
          }
          this.corregimientosCont = response.result.corregimientos;
        } else {
          if (!first) {
            this.forma.value.insuCorregimientoId = null;
          }
          this.corregimientosInsu = response.result.corregimientos;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public getOccupations() {
    this._activityService.getAllOcupations().subscribe(
      response => {
        this.occupations = response.result.occupations;
        this.getRequest();
      },
      error => {
        console.log(error);
        this.isLoading.emit(false);
      }
    );
  }

  public getDistricts(cont: boolean, first?: boolean) {
    this._locationService.getAllDistricts(cont ? this.forma.value.contProvinceId : this.forma.value.insuProvinceId).subscribe(
      response => {
        if (cont) {
          if (first) {
            this.districtsCont = response.result.districts;
            if (this.forma.value.contDistrictId) {
              this.getCorregimientos(true, true);
            }
          } else {
            this.forma.value.contDistrictId = null;
            this.corregimientosCont = [];
            this.forma.value.contCorregimientoId = null;
            this.districtsCont = response.result.districts;
          }
        } else {
          if (first) {
            this.districtsInsu = response.result.districts;
            if (this.forma.value.insuDistrictId) {
              this.getCorregimientos(false, true);
            }
          } else {
            this.forma.value.insuDistrictId = null;
            this.corregimientosInsu = [];
            this.forma.value.insuCorregimientoId = null;
            this.districtsInsu = response.result.districts;
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public getProvinces() {
    this._locationService.getAllProvinces().subscribe(
      response => {
        this.provinces = response.result.provinces;
        this.getNationalities();
      },
      error => {
        console.log(error);
        this.isLoading.emit(false);
      }
    );
  }

  public fillMainForm(cont: any, insu: any) {
    console.log(insu);
    if (insu.same !== null) {
      localStorage.setItem('same', insu.same ? 'true' : 'false')
    }
    this.forma = this._fb.group({
    'requestId': this._fb.control(this.requestId),
    'contName': this._fb.control(cont.name, [Validators.required, CustomValidatorDirective.namesValidator]),
    'contLastName': this._fb.control(cont.lastName, [Validators.required, CustomValidatorDirective.namesValidator]),
    'contProvinceId': this._fb.control(cont.province ? cont.province.id : null, Validators.required),
    'contDistrictId': this._fb.control(cont.district ? cont.district.id : null, Validators.required),
    'contCorregimientoId': this._fb.control(cont.corregimiento ? cont.corregimiento.id : null, Validators.required),
    'contStreet': this._fb.control(cont.street, [Validators.required]),
    'contBuilding': this._fb.control(cont.building, Validators.required),
    'contNeighborhood': this._fb.control(cont.neighborhood, Validators.required),
    'contCellphone': this._fb.control(cont.cellphone, [Validators.required, CustomValidatorDirective.cellphoneValidator]),
    'contEconomicActivity': this._fb.control(cont.economicActivity ? cont.economicActivity.id : null, [Validators.required]),
    'insuSame': this._fb.control(localStorage.getItem('same') === 'true' ? true : false, Validators.required),
    'insuName': this._fb.control(insu.name, Validators.compose([Validators.required, CustomValidatorDirective.namesValidator])),//Segundo Formulario
    'insuLastName': this._fb.control(insu.lastName,  Validators.compose([Validators.required, CustomValidatorDirective.namesValidator])),
    // 'insuDocumentType': [insu ? (insu.documentType === 'Pasaporte' ? insu.documentType : insu.document.split('-')[0]) : null, Validators.required],
    'insuDocument': [insu.document, [Validators.required, CustomValidatorDirective.documentValidator]],
    // 'insuDocument2': [!insu || insu.documentType === 'Pasaporte' ? null : insu.document.split('-')[2]],
    'insuGender': this._fb.control(insu.gender, Validators.required),
    'insuBirthday': this._fb.control(insu.birthday ? moment(insu.birthday.iso).format('YYYY-MM-DD') : null, [Validators.required, CustomValidatorDirective.dateValidator]),
    'insuCivilStatus': this._fb.control(insu.civilStatus, Validators.required),
    'insuBirthplace': this._fb.control(insu.birthplace, Validators.required),
    'insuNationalityId': this._fb.control(insu.nationality ? insu.nationality.id : null, [Validators.required]),
    'insuProfession': this._fb.control(insu.profession, [Validators.required]),
    'insuOccupation': this._fb.control(insu.occupation ? insu.occupation.id : null, [Validators.required]),
    'insuOccupationDescription': this._fb.control(insu.occupationDescription, [Validators.required]),
    'insuCompany': this._fb.control(insu.company, Validators.required),
    'insuOccupationTime': this._fb.control(insu.occupationTime, Validators.required),
    'insuOtherOccupations': this._fb.control(insu.otherOccupations, [Validators.required, CustomValidatorDirective.regularText]),
    'insuPreviousOccupations': this._fb.control(insu.previousOccupations ? insu.previousOccupations.id : null, Validators.required),
    'insuSports': this._fb.control(insu.sports, [Validators.required]),
    'insuMonthlyIncome': this._fb.control(insu.monthlyIncome, Validators.required),
    'insuProvinceId': this._fb.control(insu.province ? insu.province.id : null, Validators.required),
    'insuDistrictId': this._fb.control(insu.district ? insu.district.id : null, Validators.required),
    'insuCorregimientoId': this._fb.control(insu.corregimiento ? insu.corregimiento.id : null, Validators.required),
    'insuNeighborhood': this._fb.control(insu.neighborhood, Validators.required),
    'insuStreet': this._fb.control(insu.street, Validators.required),
    'insuBuilding': this._fb.control(insu.building, Validators.required),
    'insuLocalNumber': this._fb.control(insu.localNumber, [Validators.required, CustomValidatorDirective.localphoneValidator]),
    'insuOfficeNumber': this._fb.control(insu.officeNumber, [Validators.required, CustomValidatorDirective.localphoneValidator]),
    'insuCellphone': this._fb.control(insu.cellphone,  Validators.compose([Validators.required, CustomValidatorDirective.cellphoneValidator])),
    'insuDependents': this._fb.array([])
    });
    if (insu.province) {
      this.getDistricts(false, true);
    }
    if (cont.province) {
      this.getDistricts(true, true);
    }
  }
  

  public mainFormValidation() {
    this.percentsChecked = true;
    let payload = this.forma.value;
    this.markAllAsTouched(true);
    if (payload.insuSame === true) {
      this.forma.get('contName').setValue(payload.insuName);
      this.forma.get('contLastName').setValue(payload.insuLastName);
      this.forma.get('contProvinceId').setValue(payload.insuProvinceId);
      this.forma.get('contDistrictId').setValue(payload.insuDistrictId);
      this.forma.get('contCorregimientoId').setValue(payload.insuCorregimientoId);
      this.forma.get('contStreet').setValue(payload.insuStreet);
      this.forma.get('contBuilding').setValue(payload.insuBuilding);
      this.forma.get('contNeighborhood').setValue(payload.insuNeighborhood);
      this.forma.get('contCellphone').setValue(payload.insuCellphone);
      if (!this.forma.value.contEconomicActivity) {
        this.forma.get('contEconomicActivity').setValue(payload.insuOccupation);
      }
    }
    let dependents =  this.forma.get('insuDependents') as FormArray;
    dependents.controls.forEach(dependent => {
      dependent.get('paymentName').clearValidators();
      dependent.get('paymentDocument').clearValidators();
      dependent.get('paymentName2').clearValidators();
      dependent.get('paymentDocument2').clearValidators();
      dependent.get('paymentName').updateValueAndValidity();
      dependent.get('paymentDocument').updateValueAndValidity();
      dependent.get('paymentName2').updateValueAndValidity();
      dependent.get('paymentDocument2').updateValueAndValidity();
      dependent.updateValueAndValidity();
    });
    this.forma.updateValueAndValidity();
    
  }

  public get isPercentValid() {
    return this.percentsChecked && ((this.remainingPercentContingent + this.remainingPercentMain) === 0);
  }

  public get isPercentInvalid() {
    return this.percentsChecked && ((this.remainingPercentContingent + this.remainingPercentMain) > 0);
  }

  public saveRequest(proceed: boolean, tipo: string) {
    if (proceed) {
      this.mainFormValidation();
    }
    if((this.forma.valid && this.isPercentValid) || !proceed) {
      //if (true) {
      this.isLoading.emit(true);
      let payload = this.forma.value;
      delete payload.insuDependents;
      payload.insuOccupationTime = String(payload.insuOccupationTime);
      payload.insuBirthday =  moment(new Date(payload.insuBirthday)).format('DD/MM/YYYY');
      this._requestService.saveRequest(payload).subscribe(
        response => {
          if (proceed){
            window.scroll(0, 0);
            this.nextStep.emit();
            this.isLoading.emit(false);
          }else {
            this.isLoading.emit(false);
          }

        },
        error => {
          console.log(error);
          this.isLoading.emit(false);
        }
      );
    } else {
      this._toastr.notify('error', 'Faltan campos por completar. Por favor, revise y vuelva a enviar el formulario.');
      console.log(this.forma);
    }
  }

  public getNationalities() {
    this._locationService.getAllNationalites().subscribe(
      response => {
        this.nationalities = response.result.nationalities;
        this.getOccupations();
      },
      error => {
        console.log(error);
        this.isLoading.emit(false);
      }
    )
  }

  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
  }

  public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
  }

  public markAllAsTouched(general: boolean) {
    if (general) {
      this.forma.get('contLastName').markAsTouched();
      this.forma.get('contName').markAsTouched();
      this.forma.get('contProvinceId').markAsTouched();
      this.forma.get('contDistrictId').markAsTouched();
      this.forma.get('contCorregimientoId').markAsTouched();
      this.forma.get('contStreet').markAsTouched();
      this.forma.get('contBuilding').markAsTouched();
      this.forma.get('contNeighborhood').markAsTouched();
      this.forma.get('contCellphone').markAsTouched();
      this.forma.get('contEconomicActivity').markAsTouched();
      this.forma.get('insuName').markAsTouched();
      this.forma.get('insuLastName').markAsTouched();
      this.forma.get('insuDocument').markAsTouched();
      this.forma.get('insuGender').markAsTouched();
      this.forma.get('insuBirthday').markAsTouched();
      this.forma.get('insuCivilStatus').markAsTouched();
      this.forma.get('insuBirthplace').markAsTouched();
      this.forma.get('insuNationalityId').markAsTouched();
      this.forma.get('insuProfession').markAsTouched();
      this.forma.get('insuOccupation').markAsTouched();
      this.forma.get('insuOccupationDescription').markAsTouched();
      this.forma.get('insuCompany').markAsTouched();
      this.forma.get('insuOccupationTime').markAsTouched();
      this.forma.get('insuOtherOccupations').markAsTouched();
      this.forma.get('insuPreviousOccupations').markAsTouched();
      this.forma.get('insuSports').markAsTouched();
      this.forma.get('insuMonthlyIncome').markAsTouched();
      this.forma.get('insuProvinceId').markAsTouched();
      this.forma.get('insuDistrictId').markAsTouched();
      this.forma.get('insuCorregimientoId').markAsTouched();
      this.forma.get('insuNeighborhood').markAsTouched();
      this.forma.get('insuStreet').markAsTouched();
      this.forma.get('insuBuilding').markAsTouched();
      this.forma.get('insuLocalNumber').markAsTouched();
      this.forma.get('insuOfficeNumber').markAsTouched();
      this.forma.get('insuCellphone').markAsTouched();
    } else {
      this.modalForm.get('type').markAsTouched();
      this.modalForm.get('documentType').markAsTouched();
      this.modalForm.get('document').markAsTouched();
      this.modalForm.get('document2').markAsTouched();
      this.modalForm.get('document3').markAsTouched();
      this.modalForm.get('fullName').markAsTouched();
      this.modalForm.get('nationalityId').markAsTouched();
      this.modalForm.get('birthday').markAsTouched();
      this.modalForm.get('relationship').markAsTouched();
      this.modalForm.get('percent').markAsTouched();
      this.modalForm.get('paymentName').markAsTouched();
      this.modalForm.get('paymentDocument').markAsTouched();
      this.modalForm.get('paymentName2').markAsTouched();
      this.modalForm.get('paymentDocument2').markAsTouched();
    }
  }

  public modalValidations(select?: boolean){
    if (!select) {
      this.markAllAsTouched(false);
    }
    console.log('entropalo');
    const remaining = this.modalForm.value.type === 'Principal' ? this.remainingPercentMain : this.remainingPercentContingent;
    this.modalForm.get('percent').setValidators(Validators.compose([Validators.required, Validators.max(remaining)]));
    this.modalForm.get('percent').updateValueAndValidity();

    if (this.isYounger) {
      this.modalForm.get('paymentName').setValidators([Validators.required, CustomValidatorDirective.namesValidator]);
      this.modalForm.get('paymentDocument').setValidators([Validators.required, CustomValidatorDirective.documentValidator]);
      this.modalForm.get('paymentName2').setValidators([Validators.required, CustomValidatorDirective.namesValidator]);
      this.modalForm.get('paymentDocument2').setValidators([Validators.required, CustomValidatorDirective.documentValidator]);
      this.modalForm.get('paymentName').updateValueAndValidity();
      this.modalForm.get('paymentDocument').updateValueAndValidity();
      this.modalForm.get('paymentName2').updateValueAndValidity();
      this.modalForm.get('paymentDocument2').updateValueAndValidity();
    } else {
      this.modalForm.get('paymentName').clearValidators();
      this.modalForm.get('paymentDocument').clearValidators();
      this.modalForm.get('paymentName2').clearValidators();
      this.modalForm.get('paymentDocument2').clearValidators();
      this.modalForm.get('paymentName').updateValueAndValidity();
      this.modalForm.get('paymentDocument').updateValueAndValidity();
      this.modalForm.get('paymentName2').updateValueAndValidity();
      this.modalForm.get('paymentDocument2').updateValueAndValidity();
    }

    if (this.modalForm.value.documentType === 'Pasaporte') {
      this.modalForm.get('document').setValidators(Validators.compose([Validators.required, CustomValidatorDirective.documentValidator]));
      this.modalForm.get('document2').clearValidators();
      this.modalForm.get('document3').clearValidators();
      this.modalForm.get('document').updateValueAndValidity();
      this.modalForm.get('document2').updateValueAndValidity();
      this.modalForm.get('document3').updateValueAndValidity();
      this.modalForm.updateValueAndValidity();
    } else {
      this.modalForm.get('document').setValidators(Validators.compose([Validators.required, CustomValidatorDirective.shortDocumentValidator]));
      this.modalForm.get('document2').setValidators(Validators.compose([Validators.required, Validators.maxLength(4), CustomValidatorDirective.RegularNumbersPositive]));
      this.modalForm.get('document3').setValidators(Validators.compose([Validators.required, Validators.maxLength(6), CustomValidatorDirective.RegularNumbersPositive]));
      this.modalForm.get('document').updateValueAndValidity();
      this.modalForm.get('document2').updateValueAndValidity();
      this.modalForm.get('document3').updateValueAndValidity();
      this.modalForm.updateValueAndValidity();
    }

  }

  public getDependents() {
    this._dependentService.getDependentsByRequest(this.requestId).subscribe(
      response => {
        this.forma.setControl('insuDependents', this._fb.array([]));
        let dependents = this.forma.get('insuDependents') as FormArray;
        response.result.dependents.forEach(dependent => {
          dependents.push(this.generateDependentForm(dependent));
        });
        this.isLoading.emit(false);
      },
      error => {
        this.isLoading.emit(false);
        console.log(error);
      }
    );
  }

  public getDateWithFormat(_date: string) {
    const date = new Date(_date);
    _date = moment(_date).add(1, 'day').format('DD/MM/YYYY');
    return _date;
  }
  
  public createDependent(modal: any) {

    this.modalValidations();

    if (this.modalForm.valid) {
      modal.dismiss('Cross click');
      //this.isLoading.emit(true);
      let payload = this.modalForm.value;
  
      if (payload.documentType !== 'Pasaporte') {
        payload.document = payload.document.concat('-').concat(payload.document2).concat('-').concat(payload.document3);
      }
      delete payload.document2;
      delete payload.document3;
      
      
      payload.birthday = moment(new Date(payload.birthday)).format('DD/MM/YYYY');
  
      payload.name = String(payload.fullName).split(' ')[0];
      payload.lastName = String(payload.fullName).split(' ')[1];
      delete payload.fullName;

      if (!this.isYounger) {
        delete payload.paymentName;
        delete payload.paymentDocument;
        delete payload.paymentName2;
        delete payload.paymentDocument2;
      }
      console.log(payload);
      if (this.edit) {
        this._dependentService.updateDependent(payload).subscribe(
          response => {
            this.modalForm = null;
            this.getDependents();
            this.isLoading.emit(false);
          },
          error => {
            console.log(error);
            this.isLoading.emit(false);
            this.open(modal);
          }
        );
      } else {
        delete payload.id;
        this._dependentService.createDependent(payload).subscribe(
          response => {
            this.modalForm = null;
            this.getDependents();
            this.isLoading.emit(false);
          },
          error => {
            console.log(error);
            this.isLoading.emit(false);
            this.open(modal);
          }
        );
      }
    } else {
      console.log(this.modalForm);
    }
  }

  public get isYounger() {
    return this.modalForm.value.birthday ? moment(new Date()).diff(this.modalForm.value.birthday, 'years') < 18 : false;
  }

  public get remainingPercentMain(): number {
    let percent = 100;
    let dependents = this.forma.get('insuDependents') as FormArray;
    dependents.controls.forEach(dependent => {
      if (dependent.value.type === 'Principal' && (!this.modalForm || (dependent.value.dependentId !== this.modalForm.value.dependentId))) {
        percent -= dependent.value.percent;
      }
    });
    return percent;
  }

  public get remainingPercentContingent(): number {
    let percent = 100;
    let dependents = this.forma.get('insuDependents') as FormArray;
    dependents.controls.forEach(dependent => {
      if (dependent.value.type === 'Contingente' && (!this.modalForm || (dependent.value.dependentId !== this.modalForm.value.dependentId))) {
        percent -= dependent.value.percent;
      }
    });
    return percent;
  }

  public getNationality(nationalityId: string) {
    return this.nationalities.find(obj => {return nationalityId === obj.id});
  }

  public deleteDependent(dependentId: string) {
    this._dependentService.deleteDependents(dependentId, this.requestId).subscribe(
      response => {
        this.getDependents();
      },
      error => {
        console.log(error);
      }
    )
  }

  public generateDependentForm(dependentObject?: any): FormGroup {
    return this._fb.group({
      dependentId: [dependentObject ? dependentObject.id : null],
      fullName: [dependentObject ? dependentObject.name.concat(' ').concat(dependentObject.lastName) : null, [Validators.required, CustomValidatorDirective.fullNameValidator]],
      type: [dependentObject ? dependentObject.type : null, Validators.required],
      documentType: [dependentObject ? dependentObject.documentType : null, Validators.required],
      document: [dependentObject ? (dependentObject.documentType === 'Pasaporte' ? dependentObject.document : dependentObject.document.split('-')[0]) : null, Validators.required],
      document2: [!dependentObject || dependentObject.documentType === 'Pasaporte' ? null : dependentObject.document.split('-')[1]],
      document3: [!dependentObject || dependentObject.documentType === 'Pasaporte' ? null : dependentObject.document.split('-')[2]],
      nationalityId: [dependentObject ? dependentObject.nationality.id : null, Validators.required],
      birthday: [dependentObject && dependentObject.birthday ? moment(dependentObject.birthday.iso).format('YYYY-MM-DD') : null, [Validators.required, CustomValidatorDirective.dateValidator]],
      relationship: [dependentObject ? dependentObject.relationship : null, Validators.required],
      percent: [dependentObject ? dependentObject.percent : null, Validators.required],
      requestId: [this.requestId],
      paymentName: [dependentObject ? dependentObject.paymentName : null, [Validators.required, CustomValidatorDirective.namesValidator]],
      paymentDocument: [dependentObject ? dependentObject.paymentDocument : null, [Validators.required, CustomValidatorDirective.documentValidator]],
      paymentName2: [dependentObject ? dependentObject.paymentName2 : null, [Validators.required, CustomValidatorDirective.namesValidator]],
      paymentDocument2: [dependentObject ? dependentObject.paymentDocument2 : null, [Validators.required, CustomValidatorDirective.documentValidator]]
    });
  }

  public open(content, dependent?: FormGroup) {
    this.edit = dependent ? true : false;
    this.modalForm = dependent ? dependent : this.generateDependentForm();
    this._modalService.open(content, {centered: true});
  }

}
