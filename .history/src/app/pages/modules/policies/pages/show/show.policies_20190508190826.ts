import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'bsp-show-policies',
  templateUrl: './show.policies.html',
  styleUrls: ['./show.policies.scss']
})
export class ShowPolicies implements OnInit {
  public modalRef: BsModalRef;
  public isLoading = true;
  public isFiltering = false;
  public listUser: Array<any> = [];
  public achievements = '';
  public timeOut: any = null;
  public searchBarContent = '';

  constructor(private _route: Router) { }

  ngOnInit() {
  }

  public refresh() {
  }


  public searchOnKey(value: string) {
    clearTimeout(this.timeOut);

    this.timeOut = setTimeout(() => {
      this.searchBarContent = value;
      this.isFiltering = true;
    }, 1500);
  }


  public showDetail(id: string) {
    this._route.navigate(['/insurance-detail/' + id]);
  }

}
