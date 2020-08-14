import { Component, OnInit } from '@angular/core';
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
  public customClass = 'customClass';
  public requestId: string;
  public isLoading: boolean;
  public request: any;

  // tslint:disable-next-line:max-line-length
  constructor(private _requestService: RequestService, private modalService: NgbModal, private _activatedRoute: ActivatedRoute, private _dependentsService: DependentService) {
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
        console.log("request", this.request);
        this.getDependents();
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  open(content) {
    this.modalService.open(content, { centered: true });
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
    );
  }

  getFileInfo(filePath = "") {
    const fileExtension = filePath.toLowerCase().split(".").pop();
    const validImage = ["jpg", "jpeg", "png"];
    const fileName = "documento-adjunto" + "." + fileExtension;
    let _documentAttachment = {
      name: fileName,
      size: 0,
      url: filePath,
      isImage: false
    };
    if (validImage.includes(fileExtension)) {
      _documentAttachment.isImage = true;
    }
    return _documentAttachment;
  }

}
