import { Component, OnInit, ViewChild } from '@angular/core';
import { ArchwizardModule, WizardComponent } from 'angular-archwizard';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'bsp-show',
  templateUrl: './show.html',
  styleUrls: ['./show.scss']

})
export class ShowInformationComponent implements OnInit {

public flag: boolean = false;
public formulario: FormGroup;
public requestId: string;
@ViewChild('wizard') wizard: WizardComponent;


  constructor(private modalService: NgbModal, private fb: FormBuilder, private _router: Router, private _route: ActivatedRoute) {
    this.requestId = _route.snapshot.paramMap.get('requestId');
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      forma: this.fb.group({
      'requestId': this.fb.control(this.requestId),
      'contFullname': this.fb.control(null, [Validators.required]), //Primer Formulario
      'contProvinceId': this.fb.control(null),
      'contDistrictId': this.fb.control(null),
      'contCorregimientoId': this.fb.control(null),
      'contStreet': this.fb.control(null, [Validators.required]),
      'contBuilding': this.fb.control(null),
      'contNeighborhood': this.fb.control(null),
      'contCellphone': this.fb.control(null),
      'contEconomicActivity': this.fb.control(null, [Validators.required]),
      'insuName': this.fb.control(null, Validators.compose([Validators.required, Validators.minLength(4)])),//Segundo Formulario
      'insuLastName': this.fb.control(null,  Validators.compose([Validators.required, Validators.minLength(4)])),
      'insuDocumentType': this.fb.control(null,  Validators.required),
      'insuDocument': this.fb.control(null,  Validators.required),
      'insuDocument2': this.fb.control(null),
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
      'insuMonthlyIncome': this.fb.control(null),
      'insuProvinceId': this.fb.control(null),
      'insuDistrictId': this.fb.control(null),
      'insuCorregimientoId': this.fb.control(null),
      'insuNeighborhood': this.fb.control(null),
      'insuStreet': this.fb.control(null),
      'insuBuilding': this.fb.control(null),
      'insuLocalNumber': this.fb.control(null),
      'insuCellphone': this.fb.control(null,  Validators.compose([Validators.required, Validators.minLength(7),Validators.maxLength(14)])),
      'insuEmail': this.fb.control(null, Validators.compose([Validators.required, Validators.email])),
      'insuDependents': this.fb.array([])
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
  public inicio(){
    window.scrollTo(0, 0);
    this.wizard.model.navigationMode.goToNextStep();
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
