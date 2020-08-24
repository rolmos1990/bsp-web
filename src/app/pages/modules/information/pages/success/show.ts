import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { WizardComponent } from 'angular-archwizard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../core/services/request.service';
import { ShowSuccessService } from './show.service';


@Component({
  selector: 'bsp-show',
  templateUrl: './show.html',
  styleUrls: ['./show.scss']

})
export class SuccessInformationComponent implements OnInit {

  public flag: boolean = false;
  public requestId: string;
  public request: any = null;
  public isLoading: boolean;
  @ViewChild('wizard') wizard: WizardComponent;


  constructor(private modalService: NgbModal, private _requestService: RequestService, private _showService: ShowSuccessService,
    private _router: Router, private _route: ActivatedRoute) {
      
      this.requestId = _route.snapshot.paramMap.get('requestId');
      this.flag = true;
      this.redirectInsureNotExist(this.requestId);

  }

  ngOnInit() {
    this.isLoading = true;
  }

  redirectInsureNotExist(requestId: string) {
    this._requestService.getRequest(requestId).subscribe(
      response => {
        if (response.result.request.id) {
          let _response = response;
          this.request = _response.result.request;
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
