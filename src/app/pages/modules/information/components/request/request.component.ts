import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DOCUMENTS } from '../../../core/utils/select.util';
import { LocationService } from '../../../core/services/location.service';
import { RequestService } from '../../../core/services/request.service';
import { DependentService } from '../../../core/services/dependent.service';
import * as moment from 'moment';


@Component({
  selector: 'bsp-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  public customClass: string = 'customClass';
  public isFirstOpen: boolean = true;
  public modalForm: FormGroup;
  public documents = DOCUMENTS;
  public edit: boolean;
  public nationalities: Array<any>;
  @Input() forma: FormGroup;
  @Input() requestId: string;
  @Output() nextStep: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal,
              private _fb: FormBuilder,
              private _locationService: LocationService,
              private _requestService: RequestService,
              private _dependentService: DependentService) {
                this.edit = false;
  }
  
  ngOnInit() {
    this.getNationalities();
    this.getDependents();
  }

  public saveRequest(proceed: boolean) {
    let payload = this.forma.value;
    payload.insuDependents.forEach((dependent, index) => {
      payload.insuDependents[index] = dependent.dependentId;
    });
    this._requestService.saveRequest(payload).subscribe(
      response => {
        console.log(response);
        if (proceed) {
          this.nextStep.emit();
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  public getNationalities() {
    this._locationService.getAllNationalites().subscribe(
      response => {
        this.nationalities = response.result.nationalities;
      },
      error => {
        console.log(error);
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
      this.forma.get('contFullname').markAsTouched();
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
      this.forma.get('insuDocumentType').markAsTouched();
      this.forma.get('insuDocument').markAsTouched();
      this.forma.get('insuDocument2').markAsTouched();
      this.forma.get('insuDocument3').markAsTouched();
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
      this.forma.get('insuIngreso').markAsTouched();
      this.forma.get('insuProvinceId').markAsTouched();
      this.forma.get('insuCorregimientoId').markAsTouched();
      this.forma.get('insuNeighbourhood').markAsTouched();
      this.forma.get('insuStreet').markAsTouched();
      this.forma.get('insuBuilding').markAsTouched();
      this.forma.get('insuLocalNumber').markAsTouched();
      this.forma.get('insuCellphone').markAsTouched();
      this.forma.get('insuEmail').markAsTouched();
    } else {
      this.modalForm.get('type').markAsTouched();
      this.modalForm.get('documentType').markAsTouched();
      this.modalForm.get('document').markAsTouched();
      this.modalForm.get('document2').markAsTouched();
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

    const remaining = this.modalForm.value.type === 'principal' ? this.remainingPercentMain : this.remainingPercentContingent;
    this.modalForm.get('percent').setValidators(Validators.compose([Validators.required, Validators.max(remaining)]));
    this.modalForm.get('percent').updateValueAndValidity();

    if (this.isYounger) {
      this.modalForm.get('paymentName').setValidators(Validators.required);
      this.modalForm.get('paymentDocument').setValidators(Validators.required);
      this.modalForm.get('paymentName2').setValidators(Validators.required);
      this.modalForm.get('paymentDocument2').setValidators(Validators.required);
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
      this.modalForm.get('document').setValidators(Validators.compose([Validators.required, Validators.maxLength(10)]));
      this.modalForm.get('document2').clearValidators();
      this.modalForm.get('document').updateValueAndValidity();
      this.modalForm.get('document2').updateValueAndValidity();
      this.modalForm.updateValueAndValidity();
    } else {
      this.modalForm.get('document').setValidators(Validators.compose([Validators.required, Validators.maxLength(4)]));
      this.modalForm.get('document2').setValidators(Validators.compose([Validators.required, Validators.maxLength(6)]));
      this.modalForm.get('document').updateValueAndValidity();
      this.modalForm.get('document2').updateValueAndValidity();
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
        console.log(dependents);
      },
      error => {
        console.log(error);
      }
    );
  }

  public createDependent(modal: any) {

    this.modalValidations();

    if (this.modalForm.valid) {
      let payload = this.modalForm.value;
  
      if (payload.documentType === 'Pasaporte') {
        delete payload.document2;
      } else {
        payload.document = payload.documentType.concat('-').concat(payload.document).concat('-').concat(payload.document2);
        delete payload.document2;
      }
  
      const date = new Date(payload.birthday);
      payload.birthday = String(date.getDate() + 1).concat('/').concat(String(date.getMonth() + 1)).concat('/').concat(String(date.getFullYear()));
  
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
            modal.dismiss('Cross click');
            this.getDependents();
          },
          error => {
            console.log(error);
          }
        );
      } else {
        delete payload.id;
        this._dependentService.createDependent(payload).subscribe(
          response => {
            modal.dismiss('Cross click');
            this.getDependents();
          },
          error => {
            console.log(error);
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
      if (dependent.value.type === 'principal' && (dependent.value.dependentId !== this.modalForm.value.dependentId)) {
        percent -= dependent.value.percent;
      }
    });
    return percent;
  }

  public get remainingPercentContingent(): number {
    let percent = 100;
    let dependents = this.forma.get('insuDependents') as FormArray;
    dependents.controls.forEach(dependent => {
      if (dependent.value.type === 'contingente' && (dependent.value.dependentId !== this.modalForm.value.dependentId)) {
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
      fullName: [dependentObject ? dependentObject.name.concat(' ').concat(dependentObject.lastName) : null, Validators.required],
      type: [dependentObject ? dependentObject.type : null, Validators.required],
      documentType: [dependentObject ? (dependentObject.documentType === 'Pasaporte' ? dependentObject.documentType : dependentObject.document.split('-')[0]) : null, Validators.required],
      document: [dependentObject ? (dependentObject.documentType === 'Pasaporte' ? dependentObject.document : dependentObject.document.split('-')[1]) : null, Validators.required],
      document2: [!dependentObject || dependentObject.documentType === 'Pasaporte' ? null : dependentObject.document.split('-')[2]],
      nationalityId: [dependentObject ? dependentObject.nationality.id : null, Validators.required],
      birthday: [dependentObject ? new Date(dependentObject.birthday.iso) : null, Validators.required],
      relationship: [dependentObject ? dependentObject.relationship : null, Validators.required],
      percent: [dependentObject ? dependentObject.percent : null, Validators.required],
      requestId: [this.requestId],
      paymentName: [dependentObject ? dependentObject.paymentName : null],
      paymentDocument: [dependentObject ? dependentObject.paymentDocument : null],
      paymentName2: [dependentObject ? dependentObject.paymentName2 : null],
      paymentDocument2: [dependentObject ? dependentObject.paymentDocument2 : null]
    });
  }

  public open(content, dependent?: FormGroup) {
    this.edit = dependent ? true : false;
    this.modalForm = dependent ? dependent : this.generateDependentForm();
    this._modalService.open(content, {centered: true});
  }

}
