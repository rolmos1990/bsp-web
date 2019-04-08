import { Component, OnInit } from '@angular/core';
import { ArchwizardModule } from 'angular-archwizard';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'bsp-show',
  templateUrl: './show.html',
  styleUrls: ['./show.scss']

})
export class ShowInformationComponent implements OnInit {

flag: boolean = false;
formulario: FormGroup;

  ngOnInit() {
      this.formulario = this.fb.group({
        forma: this.fb.group({
        'contFullname': this.fb.control(null, [Validators.required]), //Primer Formulario
        'contProvinceId': this.fb.control(null),
        'contDistrictId': this.fb.control(null),
        'contCorregimientoId': this.fb.control(null),
        'contStreet': this.fb.control(null, [Validators.required]),
        'contBuilding': this.fb.control(null),
        'contNeighborhood': this.fb.control(null),
        'contCellphone': this.fb.control(null),
        'contEconomicActivity': this.fb.control(null, [Validators.required]),
        'contFax': this.fb.control(null),
        'insuName': this.fb.control(null, Validators.compose([Validators.required, Validators.minLength(4)])),//Segundo Formulario
        'insuLastName': this.fb.control(null,  Validators.compose([Validators.required, Validators.minLength(4)])),
        'insuDocument': this.fb.control(null,  Validators.compose([Validators.required, Validators.minLength(7)])),
        'insuGender': this.fb.control(null),
        'insuBirthday': this.fb.control(null, [Validators.required]),
        'insuCivilStatus': this.fb.control(null),
        'insuBirthplace': this.fb.control(null),
        'insuNationalityId': this.fb.control(null, [Validators.required]),
        'insuProfession': this.fb.control(null, [Validators.required]),
        'insuOccupation': this.fb.control(null, [Validators.required]),
        'insuOccupationDescription': this.fb.control(null),
        'insuCompany': this.fb.control(null),
        'insuOccupationTime': this.fb.control(null),
        'insuOtherOccupations': this.fb.control(null),
        'insuPreviousOccupations': this.fb.control(null),
        'insuSports': this.fb.control(null),
        'insuIngreso': this.fb.control(null),
        'insuProvinceId': this.fb.control(null),
        'insuDistrictId': this.fb.control(null),
        'insuCorregimientoId': this.fb.control(null),
        'insuNeighbourhood': this.fb.control(null),
        'insuStreet': this.fb.control(null),
        'insuBuilding': this.fb.control(null),
        'insuLocalNumber': this.fb.control(null),
        'insuCellphone': this.fb.control(null,  Validators.compose([Validators.required, Validators.minLength(7),Validators.maxLength(14)])),
        'insuEmail': this.fb.control(null, Validators.compose([Validators.required, Validators.email])),
          //AQUI FALTAN LOS CAMPOS DE LOS BENEFICIARIOS

        'insuPaymentName': this.fb.control(null, [Validators.required]),
        'insuPaymentDocument': this.fb.control(null, [Validators.required]),
        'insuPaymentName2': this.fb.control(null, [Validators.required]),
        'insuPaymentDocument2': this.fb.control(null, [Validators.required]),
        }),
        formaMedical: this.fb.group({
          'weightDecrease': this.fb.control(null, [Validators.required]),
          'weight': this.fb.control(null, [Validators.required]),
          'height': this.fb.control(null, [Validators.required]),
          'neurologycalDisorder': this.fb.control(null, [Validators.required]),
          'mentalDiseases': this.fb.control(null, [Validators.required]),
          'physicalDiseases': this.fb.control(null, [Validators.required]),
          'physicalImpediment': this.fb.control(null, [Validators.required]),
          'accidents': this.fb.control(null, [Validators.required]),
          'pilot': this.fb.control(null, [Validators.required]),
          'airplaneType': this.fb.control(null, [Validators.required]),
          'saler': this.fb.control(null, [Validators.required]),
          'userFrequency': this.fb.control(null, [Validators.required]),
          'arrested': this.fb.control(null, [Validators.required]),
          'passenger': this.fb.control(null, [Validators.required]),
          'passengerFrequency': this.fb.control(null, [Validators.required]),
          'worker': this.fb.control(null, [Validators.required]),
          'workerPlaces': this.fb.control(null, [Validators.required]),
          'useFlammableMaterials': this.fb.control(null, [Validators.required]),
          'useMachinery': this.fb.control(null, [Validators.required]),
          'machinery': this.fb.control(null, [Validators.required]),
          'useFrequency': this.fb.control(null, [Validators.required]),
          'useElectricity': this.fb.control(null, [Validators.required]),
          'electricityType': this.fb.control(null, [Validators.required]),
          'useExplosives': this.fb.control(null, [Validators.required]),
        }),
        formaPayment: this.fb.group({
          'cardName': this.fb.control(null, Validators.compose([Validators.required, Validators.minLength(8)])),
          'cardNumber': this.fb.control(null, Validators.compose([Validators.required, Validators.minLength(16)])),
          'expireMonth': this.fb.control(null, [Validators.required]),
          'expireYear': this.fb.control(null, [Validators.required]),
          'cvv': this.fb.control(null, Validators.compose([Validators.required, Validators.maxLength(3)])),
        }),
        formaDelivery: this.fb.group({
          'placeDescription': this.fb.control(null, [Validators.required]),
          'livingPlace': this.fb.control(null, [Validators.required]),
          'deliverTime': this.fb.control(null, [Validators.required]),
          'referencePoint': this.fb.control(null, [Validators.required]),
        })
      });
  }

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  public inicio(){
    window.scrollTo(0, 0);
  }

  public getPosition(id: string) {
    console.log($('#' + id).position().top);
    return $('#' + id).position().top;
  }

  public scrollToTopAnimated(scroll: number) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > scroll) {
        window.scrollTo(0, pos - 25); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 25);
  }

  public scrollToBottomAnimated(scroll: number) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos < scroll) {
        window.scrollTo(0, pos + 25); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 25);
  }

  showSucess():void{
    window.scrollTo(0, 0); 
    this.flag = true;
  }

  open(content) {
    this.modalService.open(content, {centered: true,size: 'lg'});
  }
}
