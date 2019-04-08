import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CoverageService } from '../../../core/services/coverage.service';
import { CreateNewRequestService } from '../../../core/services/new-request.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'bsp-show',
  templateUrl: './show.html',
  styleUrls: ['./show.scss']
})
export class ShowComponent implements OnInit {

  public coverages : any[] = [];

  constructor(private modalService: NgbModal, private _coverageService: CoverageService, private _newrequestService:CreateNewRequestService,
      private _router: Router, private _route: ActivatedRoute) {
  }


  open(content,valor) {
    parseInt(valor);
    let x:number = parseInt(valor);
    console.log(x);
    this.modalService.open(content, {centered: true});
  }

  customClass: string = 'customClass';
  isFirstOpen = true;

  ngOnInit() {
    this.getCoverages();
    
  }

  private getCoverages(){
    this._coverageService.getAllConverages().subscribe(
      response => {
        this.coverages = response.result.insurances;
        console.log(response);
      }, error => {
        console.log(error);
      }
    )
  }

  private createNewRequest(insuranceId: string){ //id1 es la carta id2 es el usuario que lo traemos por url
    this._newrequestService.createNewRequest(insuranceId, this._route.snapshot.paramMap.get('userId')).subscribe(
      response => {
        this._router.navigate(['information', response.result.request.id]);
      }, error => {
        console.error(error)
      }
    );
  }
}
