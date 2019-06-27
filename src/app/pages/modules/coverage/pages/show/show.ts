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

  customClass = 'customClass';
  isFirstOpen = true;

  constructor(private modalService: NgbModal, private _coverageService: CoverageService,
  private _newrequestService: RequestService, private _router: Router, private _route: ActivatedRoute) {
    this.isLoading = true;
  }


  ngOnInit() {
    this.getCoverages();
  }

  private getCoverages() {
    this._coverageService.getAllConverages().subscribe(
      response => {
        this.isLoading = false;
        this.coverages = response.result.insurances;
      }, error => {
      }
    );
  }

  public reject(modal: any) {
    modal.dismiss('Cross click');
    this._router.navigate(['formulario', this.insuranceId, 'rechazo']);
  }

  private createNewRequest(modal: any) {
        modal.dismiss('Cross click');
    this.isLoading = true;
    this._newrequestService.createNewRequest(this.insuranceId, this._route.snapshot.paramMap.get('userId')).subscribe(
      response => {
        this._router.navigate(['formulario', response.result.request.id]);
      }, error => {
        console.error(error);
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
