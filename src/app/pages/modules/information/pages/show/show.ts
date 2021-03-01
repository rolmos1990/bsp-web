import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ArchwizardModule, WizardComponent } from 'angular-archwizard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../core/services/request.service';
import { ShowService } from './show.service';


@Component({
  selector: 'bsp-show',
  templateUrl: './show.html',
  styleUrls: ['./show.scss']

})
export class ShowInformationComponent implements OnInit {

  public flag: boolean = false;
  public formulario: FormGroup;
  public requestId: string;
  public request: any = null;
  public isLoading: boolean;
  public insureType: string;
  public paymentInformation: any = {};
  @ViewChild('wizard') wizard: WizardComponent;
  @ViewChild('wizard2') wizard2: WizardComponent;


  constructor(private modalService: NgbModal, private fb: FormBuilder, private _requestService: RequestService, private _showService: ShowService,
    private _router: Router, private _route: ActivatedRoute) {
    this.isLoading = true;
    this.requestId = _route.snapshot.paramMap.get('requestId');
    this.flag = false;
    this.isLoading = true;
    this.redirectInsureNotExist(this.requestId);
  }

  redirectInsureNotExist(requestId: string) {
    this._requestService.getRequest(requestId).subscribe(
      response => {
        const _request = response.result.request;
        if (_request.id && ['Iniciada', 'Recibida'].includes(_request.status)) {
          this.insureType = _request.insurance.insuranceType;
          this.isLoading = false;
        }
        else {
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

  ngOnInit() {

  }
  public inicio() {
    window.scrollTo(0, 0);
    this._showService.stepCredit = false;
    this.wizard.model.navigationMode.goToNextStep();
    if (this.wizard.model.currentStepIndex === 1) {
      this.getRequest();
    }

  }

  public goPayment(){
    window.scrollTo(0, 0);
    this._showService.stepCredit = false;
    this.wizard.model.navigationMode.goToNextStep();
    this.getRequest();
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

  showSucess(): void {
    window.scrollTo(0, 0);
    this.flag = true;
  }

  public anterior() {
    window.scrollTo(0, 0);
    this._showService.stepCredit = false;
    this.wizard.model.navigationMode.goToPreviousStep();
  }

  open(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  public getRequest() {
    this.isLoading = true;
    this._requestService.getRequest(this.requestId).subscribe(
      response => {
        this.request = response;
        this.insureType = response.result.request.insurance.insuranceType;
        this.paymentInformation = response.result.request.paymentInformation;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  public enterSecondStep(event) {
    // if (!this._showService.stepCredit) {
    //   this._showService.changeCreditCard(true);
    // }
  }

  public enterFirstStep(event) {
    if (this.wizard.model.currentStepIndex >= 0) {
      this._showService.changeCreditCard(true);
      this.wizard.model.navigationMode.goToNextStep();
    }
  }

  public enterSuccess(event) {

    if(this.wizard.model.currentStepIndex == 1){
        this._showService.changeCreditCard(true);
      }

      this.wizard.model.navigationMode.goToNextStep();
  }

}
