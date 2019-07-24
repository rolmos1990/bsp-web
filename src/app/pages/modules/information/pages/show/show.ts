import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('wizard') wizard: WizardComponent;


  constructor(private modalService: NgbModal, private fb: FormBuilder, private _requestService: RequestService, private _showService: ShowService,
    private _router: Router, private _route: ActivatedRoute) {
    this.requestId = _route.snapshot.paramMap.get('requestId');
  }

  ngOnInit() {
    this.isLoading = true;
  }
  public inicio() {
    window.scrollTo(0, 0);
    this._showService.stepCredit = false;
    this.wizard.model.navigationMode.goToNextStep();
    if (this.wizard.model.currentStepIndex === 1) {
      this.getRequest();
    }

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
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  public enterSecondStep(event) {
    if (!this._showService.stepCredit) {
      this._showService.changeCreditCard(true);
    }
  }

}
