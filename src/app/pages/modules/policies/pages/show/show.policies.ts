import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../core/services/request.service';
import { ExcelService } from '../../../core/services/excel.service';
import * as moment from 'moment';
import { DependentService } from '../../../core/services/dependent.service';
import { NotifierService } from 'angular-notifier';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomValidatorDirective } from '../../../core/directives/validations/custom-validations.directive';
import {Location} from '@angular/common';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'bsp-show-policies',
  templateUrl: './show.policies.html',
  styleUrls: ['./show.policies.scss']
})
// tslint:disable-next-line:component-class-suffix

export class ShowPolicies implements OnInit {
  searchText = '';
  page = 0;
  pageSize = 5;
  collectionSize = 0;
  filterDelay: any;
  public requests: any[] = [];
  public searching = false;
  public routerLinkVariable = '/detalle';
  public attachments: any[] = [];
  public isLoading: boolean = true;
  public isLoadingTable: boolean = true;
  public isLoadingFile: any;
  public requestModal: any;
  public attachment: any;
  public autoRefreshInterval: any;

  public search: any = { 
    date:null,
    date_end:null,
    general:"",
    status:"",
    insuranceType: "",
    date_filter:null,
    date_end_filter:null,
    general_filter:null,
    status_filter:null
  };

  constructor(private _requestService: RequestService,
    private _fb: FormBuilder,
    private modalService: NgbModal,
    private _route: ActivatedRoute,
    private _router: Router,
    private _excelService: ExcelService,
    private _dependentsService: DependentService,
    private _toastr: NotifierService, private _location: Location) { }
    public forma: FormGroup;
    public submitted: boolean;

  ngOnInit() {
    
    if(localStorage.getItem("redirectTo")){
      const url = localStorage.getItem("redirectTo");
      try{
      console.log("REDIRECT TO", url);
      this._router.navigate([url]);
      localStorage.removeItem("redirectTo");
      }catch(e){
        console.log("error", e);
      }
      return;
    }

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

    /* auto-refresh table */
    this.restartAutoRefresh();
  }

  insuranceTypeFormat(insuranceType){
    switch((insuranceType + "").toLowerCase()){
      case 'accidentes-personales': return "Accidentes Personales"
      case 'cancer': return "Cáncer"
    }
  }

  initForm() {
    this.forma = this._fb.group({
      'policyNumber': this._fb.control(null,[Validators.required]),
      'policyFile': this._fb.control(null, [CustomValidatorDirective.customFilePDFValidator]),
      'policyUrl': this._fb.control(null, [CustomValidatorDirective.urlValidator])
    });
    this.validations();
  }

  private delay(callback: Function,_timer:number = 3000){
    const _delay = setTimeout(callback,_timer);
    return _delay;
  }

  private onSearch(){
    if(this.filterDelay){
      clearTimeout(this.filterDelay);
    }
    this.filterDelay = this.delay(() => { this.page = 1; this.refreshPage(this.page) }, 1000);
  }

  private onClearFilter(_filter){
    
    if(_filter == "date"){
      this.search[_filter+"_end_filter"] = "";
      this.search[_filter+"_end"] = "";
    }

    this.search[_filter+"_filter"] = "";
    this.search[_filter] = "";
    this.filterDelay = this.delay(() => { this.page = 1; this.refreshPage(this.page) }, 1000);
  }

  private onPageChange(pageNumber){
    this.refreshPage(pageNumber);
  }

  private onLimitPageChange(pageSize){
    this.delay(() => this.refreshPage(this.page, this.pageSize));
  }

  /* auto-refresh table interval */
  private restartAutoRefresh(){
    if(this.autoRefreshInterval){
      clearInterval(this.autoRefreshInterval);
    }
    const minutes = 1000 * 60 * 3;
    this.autoRefreshInterval = setInterval(() => this.autoRefresh(), minutes);
  }
  private autoRefresh(){
      this.refreshPage(this.page,this.pageSize, true);
  }

  private refreshPage(pageNumber, pageSize = null, ignoreLoading = false){
    const _pageSize = +this.pageSize;

    this.search = { 
      ...this.search, 
      status_filter: this.search.status,
      date_filter: this.search.date,
      date_end_filter: this.search.date_end,
      general_filter: this.search.general,
      insuranceType_filter: this.search.insuranceType,
    }

    const payload = {
      "page": pageNumber - 1,
      "displayLimit": (!pageSize) ? _pageSize : parseInt(pageSize),
      "filterParam": this.search.general || "",
      "insuranceType": this.search.insuranceType || "",
      "status": this.search.status || "",
      "initialDate": this.search.date || "",
      "finalDate": this.search.date_end || ""
    };

    this.restartAutoRefresh();
    this.getAllRequest(payload, ignoreLoading);
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
      this._toastr.notify('error', "No se ha podido emitir la poliza");
      this.isLoading = false;
      return false;
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

  private getAllRequest(payload = { page: 1, displayLimit: 5 }, ignoreLoading = false) {
    
    if(!ignoreLoading){
      this.isLoadingTable = true;
    }

    this._requestService.getAllRequest(payload).subscribe(
      response => {
        this.requests = response.result.requests;
        this.collectionSize = response.result.totalCount;
        this.requests.forEach(element => {
          this.attachments.push(null);
        });
        this.isLoadingTable = false;
        this.isLoading = false;
      }, error => {
        this.isLoadingTable = false;
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
    
    const payload = { page: 0, displayLimit: 10000 };
    this._requestService.getAllRequest(payload).subscribe(
      response => {
        this._excelService.exportAsExcelFile(response.result.requests.map(request => {
          return this.structureXLSX(request);
        }), 'Solicitud de pólizas de accidentes personales ' + moment().format('DD-MM-YYYY HH:mm:ss'));
        
      }, error => {
        this._toastr.notify('error', "No se ha podido descargar las Pólizas, intente luego.");
      }
    );
  }

  // public exportAsXLSX(): void {
  //   this._excelService.exportAsExcelFile(this.requests.map(request => {
  //     return this.structureXLSX(request);
  //   }), 'Solicitud de pólizas de accidentes personales ' + moment().format('DD-MM-YYYY HH:mm:ss'));
  // }

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
    function getFullName(_request){
      const insured = _request.insured || {};
      return `${insured.name || ""} ${insured.secondName || ""} ${insured.lastName || ""} ${insured.secondLastName || ""}`;
    }
    let _request;
    _request = {
      Numero_Solicitud: request.number,
      Numero_Poliza: request.policyNumber,
      Referencia_de_Pago: request.paymentInformation && request.paymentInformation.transaction_id,
      Estatus: request.status,
      Tipo_Seguro: request.insurance && request.insurance.insuranceType,
      Monto_Asegurado_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.insuredAmount),
      Prima_Mensual_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.monthlyPrime),
      Doble_Compensacion_Cobertura: !request.insurance ? 'N/A' : ('$' + (request.insurance.coverageDetail.dobleCompensation || "0")),
      Servicio_Emergencia_Cobertura: !request.insurance ? 'N/A' : ('$' + (request.insurance.coverageDetail.emergencyService || "0")),
      Avances_Funerarios_Cobertura: !request.insurance ? 'N/A' : ('$' + (request.insurance.coverageDetail.funeraryAdvances || "0")),
      Incapacidad_Permanente_Cobertura: !request.insurance ? 'N/A' : ('$' + (request.insurance.coverageDetail.permanentInhability || "0")),
      Asistencia_Viaje_Cobertura: !request.insurance ? 'N/A' : ('$' + (request.insurance.coverageDetail.travelAssistance || "0")),
      Muerte_Accidental_Cobertura: !request.insurance ? 'N/A' : ('$' + (request.insurance.coverageDetail.accidentalDeath || "0")),
      Gastos_Medicos_Cobertura: !request.insurance ? 'N/A' : ('$' + (request.insurance.coverageDetail.medicalExpenses || "0")),
      //Nombre_Completo_Contratante: !request.contractor || !request.contractor.name ? 'N/A' : (request.contractor.name + ' ' + request.contractor.lastName),
      //Telefono_Celular_Contratante: !request.contractor || !request.contractor.cellphone ? 'N/A' : request.contractor.cellphone,
      //Provincia_Contratante: !request.contractor || !request.contractor.province ? 'N/A' : request.contractor.province.name,
      //Distrito_Contratante: !request.contractor || !request.contractor.district ? 'N/A' : request.contractor.district.name,
      //Corregimiento_Contratante: !request.contractor || !request.contractor.corregimiento ? 'N/A' : request.contractor.corregimiento.name,
      //Urbanizacion_Contratante: !request.contractor || !request.contractor.neighborhood ? 'N/A' : request.contractor.neighborhood,
      //Calle_Contratante: !request.contractor || !request.contractor.street ? 'N/A' : request.contractor.street,
      //Vivienda_Contratante: !request.contractor || !request.contractor.building ? 'N/A' : request.contractor.building,
      Nombre_Completo_Asegurado: getFullName(request),
      Documento_Asegurado: !request.insured || !request.insured.document ? 'N/A' : request.insured.document,
      Correo_Electronico_Asegurado: (request.insured && request.insured.email) || "N/A",
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
      Tax_ID_Number_EEUU: !request.insured || !request.insured.taxIdentificationNumber ? 'N/A' : request.insured.taxIdentificationNumber,
      Padece_Enfermedad: !request.insured || request.insured.hasDiseases === undefined ? 'N/A' : (request.insured.hasDiseases)?  "Si" : "No",

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

  public canBeClosed(request: any){
    if(request.status === "En Proceso"){
      return true;
    }
      return false;
  }

}
