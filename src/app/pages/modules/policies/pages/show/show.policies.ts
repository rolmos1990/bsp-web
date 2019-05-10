import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PoliciesService } from '../../../core/services/policies.service';
import {Router} from '@angular/router';


@Component({
  selector: 'bsp-show-policies',
  templateUrl: './show.policies.html',
  styleUrls: ['./show.policies.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ShowPolicies implements OnInit {
  searchText = '';
  page = 1;
  pageSize = 5;
  public requests: any[] = [];
  public searching = false;
  public routerLinkVariable = '/detalle';

  constructor(private _getAllRequest: PoliciesService, private router: Router) { }

  ngOnInit() {
    this.getAllRequest();
  }

  private getAllRequest() {
    this._getAllRequest.getAllRequest().subscribe(
      response => {
        this.requests = response.result.requests;
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
  }

  public showSearchResults(event: any): void {
    if (event.target.value.length >= 3) {
      this.searching = true;
    } else {
      this.searching = false;
    }
  }

}
