import { Component, OnInit} from '@angular/core';
import { RequestService } from '../../core/services/request.service';
import { ActivatedRoute } from '@angular/router';
import { DependentService } from '../../core/services/dependent.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bsp-show-insurance-detail',
  templateUrl: './show.insurance-detail.html',
  styleUrls: ['./show.insurance-detail.scss']
})
export class ShowInsuranceDetailComponent implements OnInit {
  public isFirstOpen = true;
  public customClass: string = 'customClass';
  public requestId: string;
  public isLoading: boolean;
  public request: any;

  constructor(private _requestService: RequestService,private modalService: NgbModal, private _activatedRoute: ActivatedRoute, private _dependentsService: DependentService) {
    this.isLoading = true;
    this.requestId = _activatedRoute.snapshot.paramMap.get('requestId');
               }

  ngOnInit() {
    this.getRequest();
  }

  private getRequest() {
    this._requestService.getRequest(this.requestId).subscribe(
      response => {
        this.request = response.result.request;
        this.getDependents();
        console.log(this.request)
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    )
  }

  open(content) {
    this.modalService.open(content, {centered: true});
  }

  private getDependents() {
    this._dependentsService.getDependentsByRequest(this.requestId).subscribe(
      response => {
        this.request.insured.dependents = response.result.dependents;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    )
  }

}
