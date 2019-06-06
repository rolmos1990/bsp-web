import { Component, OnInit } from '@angular/core'
import {ActivatedRoute} from '@angular/router';
import { RequestService } from '../../../core/services/request.service';
import { ExcelService } from '../../../core/services/excel.service';
import * as moment from 'moment';
import { DependentService } from '../../../core/services/dependent.service';
import { NotifierService } from 'angular-notifier';

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
  public isLoading: boolean =true;
  public isLoadingFile: any;

  constructor(private _requestService: RequestService,
              private _route: ActivatedRoute,
              private _excelService: ExcelService,
              private _dependentsService: DependentService,
              private _toastr: NotifierService) { }

  ngOnInit() {
    this.getAllRequest();
    this._route.queryParams.forEach(queryParams => {
      if (queryParams['page']) {
        this.page = queryParams['page'];
      }
    });
  }

  private getAllRequest() {
    this._requestService.getAllRequest().subscribe(
      response => {
        this.requests = response.result.requests;
        this.collectionSize = this.requests.length * 5;
        console.log(this.collectionSize);
        this.requests.forEach(element=>{
          this.attachments.push(null);
        })
        console.log(response);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
  public addFile(attachment: FileList, position: number, request: any) {
    if (request.status === 'En Proceso') {
      this.isLoadingFile = request;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.attachments.splice(position, 1, event.target.result);
        this._requestService.updateRequest(request.id, this.attachments[position]).subscribe(
          response => {
            this.isLoadingFile = null;
            this.requests.splice(position, 1, response.result.request);
          }, 
          error => {
            this.isLoadingFile = null;
            console.log(error);
          }
        );
      };
      reader.readAsDataURL(attachment[0]);
    } else {
      let message = (!request.insured || !request.insured.name || !request.insured.lastName) ? 'Por favor complete esta solicitud para poder adjuntarle una póliza.' :
      'Por favor complete la solicitud de ' + request.insured.name + ' ' +request.insured.lastName + ' si desea adjuntarle una póliza.';
      this._toastr.notify('error', message);
    }
  }

  public exportAsXLSX(): void {
    this._excelService.exportAsExcelFile(this.requests.map(request => {
      return this.structureXLSX(request);
    }), 'Solicitud de polizas de accidentes personales ' + moment().format('DD-MM-YYYY HH:mm:ss'));
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
      Correo_Usuario: !request.user ? 'N/A' : request.user.email,
      Documento_Usuario:  !request.user ? 'N/A' : request.user.document,
      Edad_Usuario:  !request.user ? 'N/A' : request.user.birthday,
      Ocupacion_Usuario:  !request.user ? 'N/A' : request.user.occupation.name,
      Monto_Asegurado_Cobertura:  !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.insuredAmount),
      Prima_Mensual_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.monthlyPrime),
      Doble_Compensacion_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.dobleCompensation),
      Servicio_Emergencia_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.emergencyService),
      Avances_Funerarios_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.funeraryAdvances),
      Incapacidad_Permanente_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.permanentInhability),
      Asistencia_Viaje_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.travelAssistance),
      Muerte_Accidental_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.accidentalDeath),
      Gastos_Medicos_Cobertura: !request.insurance ? 'N/A' : ('$' + request.insurance.coverageDetail.medicalExpenses),
      Nombre_Completo_Contratante: !request.contractor || !request.contractor.name ? 'N/A' : (request.contractor.name + ' ' + request.contractor.lastName),
      Actividad_Economica_Contratante: !request.contractor || !request.contractor.economicActivity ? 'N/A' : request.contractor.economicActivity.name,
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
      Lugar_Nacimiento_Asegurado: !request.insured || !request.insured.birthplace ? 'N/A' : request.insured.birthplace,
      Provincia_Asegurado: !request.insured || !request.insured.province ? 'N/A' : request.insured.province.name,
      Distrito_Asegurado: !request.insured || !request.insured.district ? 'N/A' : request.insured.district.name,
      Corregimiento_Asegurado: !request.insured || !request.insured.corregimiento ? 'N/A' : request.insured.corregimiento.name,
      Urbanizacion_Asegurado: !request.insured || !request.insured.neighborhood ? 'N/A' : request.insured.neighborhood,
      Calle_Asegurado: !request.insured || !request.insured.street ? 'N/A' : request.insured.street,
      Vivienda_Asegurado: !request.insured || !request.insured.building ? 'N/A' : request.insured.building,
      Compania_Labora_Asegurado: !request.insured || !request.insured.company ? 'N/A' : request.insured.company,
      Ingreso_Mensual_Asegurado: !request.insured || !request.insured.monthlyIncome ? 'N/A' : request.insured.monthlyIncome,
      Ocupacion_Asegurado: !request.insured || !request.insured.occupation ? 'N/A' : request.insured.occupation.name,
      Descripcion_Ocupacion_Asegurado: !request.insured || !request.insured.occupationDescription ? 'N/A' : request.insured.occupationDescription,
      Tiempo_Ocupacion_Asegurado: !request.insured || !request.insured.occupationTime ? 'N/A' : (request.insured.occupationTime + ' meses'),
      Telefono_Oficina_Asegurado: !request.insured || !request.insured.officeNumber ? 'N/A' : request.insured.officeNumber,
      Otra_Ocupacion_Asegurado: !request.insured || !request.insured.otherOccupations ? 'N/A' : request.insured.otherOccupations,
      Ocupacion_Anterior_Asegurado: !request.insured || !request.insured.previousOccupations ? 'N/A' : request.insured.previousOccupations.name,
      Profesion_Asegurado: !request.insured || !request.insured.profession ? 'N/A' : request.insured.profession,
      Deportes_Asegurado: !request.insured || !request.insured.sports ? 'N/A' : request.insured.sports,
      Nombre_Tarjeta: !request.creditCard || !request.creditCard.cardName ? 'N/A' : request.creditCard.cardName,
      Numero_Tarjeta: !request.creditCard || !request.creditCard.cardNumber ? 'N/A' : request.creditCard.cardNumber,
      Fecha_Expiracion_Tarjeta: !request.creditCard || !request.creditCard.expireMonth ? 'N/A' : (request.creditCard.expireMonth + '/' + request.creditCard.expireYear),
      Lugar_Entrega: !request.deliverInformation ? 'N/A' : (request.deliverInformation.livingPlace === 'Vivienda' ? 'Vivienda' : request.deliverInformation.placeDescription),
      Punto_Referencia_Entrega: !request.deliverInformation ? 'N/A' : request.deliverInformation.referencePoint,
      Horario_Entrega: !request.deliverInformation ? 'N/A' : request.deliverInformation.deliverTime,
      Dependents: request.insured.dependents
    };
    return this.getRequestAndDependentsWithFormat(_request);
  }

  private getRequestAndDependentsWithFormat(request: any) {

    request.Dependents.forEach((dependent, i) => {
          request['Nombre_Completo_Dependiente_' + String(i + 1)] = !dependent.name ? 'N/A' : dependent.name + ' ' + dependent.lastName;
          request['Documento_Dependiente_' + String(i + 1)] = !dependent.document ? 'N/A' : dependent.document;
          request['Tipo_Dependiente_' + String(i + 1)] = !dependent.type ? 'N/A' : dependent.type;
          request['Parentesco_Dependiente_' + String(i + 1)] = !dependent.relationship ? 'N/A' : dependent.relationship;
          request['Porcentaje_Dependiente_' + String(i + 1)] = !dependent.percent ? 'N/A' : (dependent.percent + '%');
          request['Fecha_Nacimiento_Dependiente_' + String(i + 1)] = !dependent.birthday ? 'N/A' : moment(dependent.birthday.iso).format('DD/MM/YYYY');
          request['Nacionalidad_Dependiente_' + String(i + 1)] = !dependent.nationality ? 'N/A' : dependent.nationality.name;
          request['Nombre_Representante_1_Dependiente_' + String(i + 1)] = dependent.paymentName ? dependent.paymentName : 'N/A';
          request['Documento_Representante_1_Dependiente_' + String(i + 1)] = dependent.paymentDocument ? dependent.paymentDocument : 'N/A';
          request['Nombre_Representante_2_Dependiente_' + String(i + 1)] = dependent.paymentName2 ? dependent.paymentName2 : 'N/A';
          request['Documento_Representante_2_Dependiente_' + String(i + 1)] = dependent.paymentDocument2 ? dependent.paymentDocument2 : 'N/A';
    });
    delete request.Dependents;
    return request;
  }

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
