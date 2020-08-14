import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../core/services/request.service';
import { ExcelService } from '../../../core/services/excel.service';
import * as moment from 'moment';
import { DependentService } from '../../../core/services/dependent.service';
import { NotifierService } from 'angular-notifier';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomValidatorDirective } from '../../../core/directives/validations/custom-validations.directive';

@Component({
  selector: 'bsp-show-policies',
  templateUrl: './show.policies.html',
  styleUrls: ['./show.policies.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ShowPolicies implements OnInit {
  searchText = '';
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  public requests: any[] = [];
  public searching = false;
  public routerLinkVariable = '/detalle';
  public attachments: any[] = [];
  public isLoading: boolean = true;
  public isLoadingFile: any;
  public requestModal: any;
  public attachment: any;

  constructor(private _requestService: RequestService,
    private _fb: FormBuilder,
    private modalService: NgbModal,
    private _route: ActivatedRoute,
    private _excelService: ExcelService,
    private _dependentsService: DependentService,
    private _toastr: NotifierService) { }
    public forma: FormGroup;
    public submitted: boolean;

  ngOnInit() {
    this.getAllRequest();
    this._route.queryParams.forEach(queryParams => {
      if (queryParams['page']) {
        this.page = queryParams['page'];
      }
    });
    this.attachment = {
      name: false,
      data: false
    };
    this.initForm();
  }

  initForm() {
    this.forma = this._fb.group({
      'policyNumber': this._fb.control(null,[Validators.required]),
      'policyFile': this._fb.control(null, [CustomValidatorDirective.customFilePDFValidator]),
      'policyUrl': this._fb.control(null, [CustomValidatorDirective.urlValidator])
    });
    this.validations();
  }

  public submit() {
    if (this.forma.valid) {
      this.isLoading = true;
      let payload = this.forma.value;
      payload.requestId = this.requestModal.id;

      if(this.requestModal.status !== "En Proceso"){
        this._toastr.notify('error', "Esta solicitud aún no ha sido completada");
        this.isLoading = false;
        return false;
      }
      
      this._requestService.updateRequest(payload).subscribe(
        response => {
          const _message = response.result.message;
          if(_message){
            this.getAllRequest();
            this.modalService.dismissAll();
            this._toastr.notify('success', _message);
          }
          else{
            const _errorMessage = response.error.message;
            this._toastr.notify('error', _errorMessage);
          }
          console.log("saved successful", response);
          this.isLoading = false;
          //this._router.navigate(['cobertura', requestId]);
        }, error => {
          console.error(error);
          this.isLoading = false;
          this._toastr.notify('error', "Se ha producido un error al internar emitir poliza");
        }
      );

    }
    else{
      console.log("error to show", this.forma);
    }
}

  public validations() {
    this.forma.updateValueAndValidity();
  }
  
  public invalid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && !form.get(controlName).valid;
  }

  public valid(controlName: string, form: FormGroup) {
    return form.get(controlName).touched && form.get(controlName).valid;
  }


  openSm(content, _request, mod?) {
    if (mod) {
      mod.dismiss('Cross click');
    } else {
    }

    this.requestModal = _request;
    this.attachment = {name: false, data: false};
    this.forma.reset();
    this.modalService.open(content, {centered: true});
  }

  private getAllRequest() {
    this._requestService.getAllRequest().subscribe(
      response => {
        this.requests = response.result.requests;
        this.collectionSize = this.requests.length * 5;
        this.requests.forEach(element => {
          this.attachments.push(null);
        })
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
  public openAttachPolize(){
    
  }

  public addFile(attachment: FileList) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.attachment.name = attachment[0].name;
        this.attachment.data = event.target.result;
        this.forma.value.policyFile = event.target.result;
        this.forma.get("policyFile").markAsTouched();      
      };
      reader.onerror = (event: any) => {
        this.forma.value.policyFile = false;
        this.attachment.name = false;
        this.attachment.data = false;
        this.forma.get("policyFile").markAsTouched();
      }
      reader.readAsDataURL(attachment[0]);
  }

  public exportAsXLSX(): void {
    this._excelService.exportAsExcelFile(this.requests.map(request => {
      return this.structureXLSX(request);
    }), 'Solicitud de pólizas de accidentes personales ' + moment().format('DD-MM-YYYY HH:mm:ss'));
  }

  public getRequestWithDependents() {
    this.isLoading = true;
    this.requests.forEach((request, index) => {
      this._dependentsService.getDependentsByRequest(request.id).subscribe(
        response => {
          request.insured.dependents = response.result.dependents;
          if (index === (this.requests.length - 1)) {
            this.isLoading = false;
            this.exportAsXLSX();
          }
        },
        error => {
          console.log(error);
          this.isLoading = false;
        }
      );
    });
  }

  private structureXLSX(request: any): any {
    let _request;
    _request = {
      Numero_Solicitud: request.number,
      Estatus: request.status,
      Tipo_Seguro: request.insurance.type,
      Monto_Asegurado_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.insuredAmount),
      Prima_Mensual_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.monthlyPrime),
      Doble_Compensacion_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.dobleCompensation),
      Servicio_Emergencia_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.emergencyService),
      Avances_Funerarios_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.funeraryAdvances),
      Incapacidad_Permanente_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.permanentInhability),
      Asistencia_Viaje_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.travelAssistance),
      Muerte_Accidental_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.accidentalDeath),
      Gastos_Medicos_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.medicalExpenses),
      Nombre_Completo_Contratante: !request.contractor || !request.contractor.name ? 'N/A' : (request.contractor.name + ' ' + request.contractor.lastName),
      Telefono_Celular_Contratante: !request.contractor || !request.contractor.cellphone ? 'N/A' : request.contractor.cellphone,
      Provincia_Contratante: !request.contractor || !request.contractor.province ? 'N/A' : request.contractor.province.name,
      Distrito_Contratante: !request.contractor || !request.contractor.district ? 'N/A' : request.contractor.district.name,
      Corregimiento_Contratante: !request.contractor || !request.contractor.corregimiento ? 'N/A' : request.contractor.corregimiento.name,
      Urbanizacion_Contratante: !request.contractor || !request.contractor.neighborhood ? 'N/A' : request.contractor.neighborhood,
      Calle_Contratante: !request.contractor || !request.contractor.street ? 'N/A' : request.contractor.street,
      Vivienda_Contratante: !request.contractor || !request.contractor.building ? 'N/A' : request.contractor.building,
      Nombre_Completo_Asegurado: !request.insured || !request.insured.name ? 'N/A' : (request.insured.name + ' ' + request.insured.lastName),
      Documento_Asegurado: !request.insured || !request.insured.document ? 'N/A' : request.insured.document,
      Fecha_Nacimiento_Asegurado: !request.insured || !request.insured.birthday ? 'N/A' : moment(request.insured.birthday.iso).format('DD/MM/YYYY'),
      Genero_Asegurado: !request.insured || !request.insured.gender ? 'N/A' : request.insured.gender,
      Estado_Civil_Asegurado: !request.insured || !request.insured.civilStatus ? 'N/A' : request.insured.civilStatus,
      Telefono_Local_Asegurado: !request.insured || !request.insured.localNumber ? 'N/A' : request.insured.localNumber,
      Telefono_Celular_Asegurado: !request.insured || !request.insured.cellphone ? 'N/A' : request.insured.cellphone,
      Nacionalidad_Asegurado: !request.insured || !request.insured.nationality ? 'N/A' : request.insured.nationality.name,
      Pais_Nacimiento_Asegurado: !request.insured || !request.insured.country ? 'N/A' : request.insured.country.name,
      Provincia_Asegurado: !request.insured || !request.insured.province ? 'N/A' : request.insured.province.name,
      Distrito_Asegurado: !request.insured || !request.insured.district ? 'N/A' : request.insured.district.name,
      Corregimiento_Asegurado: !request.insured || !request.insured.corregimiento ? 'N/A' : request.insured.corregimiento.name,
      Urbanizacion_Asegurado: !request.insured || !request.insured.neighborhood ? 'N/A' : request.insured.neighborhood,
      Calle_Asegurado: !request.insured || !request.insured.street ? 'N/A' : request.insured.street,
      Vivienda_Asegurado: !request.insured || !request.insured.building ? 'N/A' : request.insured.building,
      Compania_Labora_Asegurado: !request.insured || !request.insured.company ? 'N/A' : request.insured.company,
      Ingreso_Mensual_Asegurado: !request.insured || !request.insured.monthlyIncome ? 'N/A' : request.insured.monthlyIncome,
      Ocupacion_Asegurado: !request.insured || !request.insured.occupation || request.insured.occupation === null ? 'N/A' : request.insured.occupation.name,
      Telefono_Oficina_Asegurado: !request.insured || !request.insured.officeNumber ? 'N/A' : request.insured.officeNumber,
      Profesion_Asegurado: !request.insured || !request.insured.profession ? 'N/A' : request.insured.profession,
      Deportes_Asegurado: !request.insured || !request.insured.sports ? 'N/A' : request.insured.sports,
    };

    return _request;
  }

  // private getRequestAndDependentsWithFormat(request: any) {

  //   request.Dependents.forEach((dependent, i) => {
  //     request['Nombre_Completo_Dependiente_' + String(i + 1)] = !dependent.name ? 'N/A' : dependent.name + ' ' + dependent.lastName;
  //     request['Documento_Dependiente_' + String(i + 1)] = !dependent.document ? 'N/A' : dependent.document;
  //     request['Tipo_Dependiente_' + String(i + 1)] = !dependent.type ? 'N/A' : dependent.type;
  //     request['Parentesco_Dependiente_' + String(i + 1)] = !dependent.relationship ? 'N/A' : dependent.relationship;
  //     request['Porcentaje_Dependiente_' + String(i + 1)] = !dependent.percent ? 'N/A' : (dependent.percent + '%');
  //     request['Fecha_Nacimiento_Dependiente_' + String(i + 1)] = !dependent.birthday ? 'N/A' : moment(dependent.birthday.iso).format('DD/MM/YYYY');
  //     request['Nacionalidad_Dependiente_' + String(i + 1)] = !dependent.nationality ? 'N/A' : dependent.nationality.name;
  //     request['Nombre_Representante_1_Dependiente_' + String(i + 1)] = dependent.paymentName ? dependent.paymentName : 'N/A';
  //     request['Documento_Representante_1_Dependiente_' + String(i + 1)] = dependent.paymentDocument ? dependent.paymentDocument : 'N/A';
  //     request['Nombre_Representante_2_Dependiente_' + String(i + 1)] = dependent.paymentName2 ? dependent.paymentName2 : 'N/A';
  //     request['Documento_Representante_2_Dependiente_' + String(i + 1)] = dependent.paymentDocument2 ? dependent.paymentDocument2 : 'N/A';
  //   });

  //   delete request.Dependents;

  //   return request;
  // }

  public removeAttachment(position: number, inputElement: HTMLInputElement) {
    this.attachments[position] = null;
    inputElement.value = null;
  }

  public showSearchResults(event: any): void {
    if (event.target.value.length >= 3) {
      this.searching = true;
    } else {
      this.searching = false;
    }
  }

}
