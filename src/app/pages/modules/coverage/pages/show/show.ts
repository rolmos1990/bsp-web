import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CoverageService } from '../../../core/services/coverage.service';
import {Router, ActivatedRoute} from '@angular/router';
import { RequestService } from '../../../core/services/request.service';

@Component({
  selector: 'bsp-show',
  templateUrl: './show.html',
  styleUrls: ['./show.scss']
})
export class ShowComponent implements OnInit {

  public coverages: any[] = [];
  public insuranceId: string;
  public actualCoverage: any;
  public isLoading: boolean;
  public insureType: string;

  customClass = 'customClass';
  isFirstOpen = true;

  constructor(private modalService: NgbModal, private _coverageService: CoverageService,
  private _requestService: RequestService, private _router: Router, private _route: ActivatedRoute) {
    this.isLoading = true;
    this.insureType = _route.snapshot.paramMap.get('insureType');
  }


  ngOnInit() {
    this.getCoverages();
  }

  private getCoverages() {
    this._coverageService.getAllConverages({type: this.insureType}).subscribe(
      response => {
        this.isLoading = false;
        this.coverages = response.result.insurances;
      }, error => {
        this.isLoading = false;
        this.coverages = [];
      }
    );
  }

  public reject(modal: any) {
    modal.dismiss('Cross click');
    this._router.navigate(['formulario', this.insuranceId, 'rechazo']);
  }

  private updateRequest(modal: any) {
        modal.dismiss('Cross click');
    this.isLoading = true;

    const payload = { insuranceId: this.insuranceId };
    this._requestService.saveRequest(payload, this.insureType).subscribe(
      response => {
        const requestId = response && response.result && response.request && response.result.request.id;
        if(!requestId){
          console.error("[pages.show.ts]", "requestId not found");
          this.isLoading = false;
        }
        localStorage.setItem('requestId', response.result)
        this._router.navigate(['cotizar', response.result.request.id]);
      }, error => {
        console.error("[pages.show.ts]", error);
        this.isLoading = false;
      }
    );
  }
  openSm(content, insurance, mod?) {
    if (mod) {
      mod.dismiss('Cross click');
    } else {
    this.actualCoverage = insurance;
    this.insuranceId = insurance.id;
    }
    this.modalService.open(content, {centered: true});
  }

  openLg(content, insurance, mod?) {
    if (mod) {
      mod.dismiss('Cross click');
    } else {
    this.actualCoverage = insurance;
    this.insuranceId = insurance.id;
    }
    this.modalService.open(content, {centered: true, size: 'lg'});
  }

}
