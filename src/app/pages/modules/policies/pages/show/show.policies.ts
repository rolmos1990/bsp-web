import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { RequestService } from '../../../core/services/request.service';
import { element } from '@angular/core/src/render3';


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
          collectionSize = 0;
  public requests: any[] = [];
  public searching = false;
  public routerLinkVariable = '/detalle';
  public attachments: any[] = [];
  public isLoading: boolean =true;
  public isLoadingFile: boolean;

  constructor(private _requestService: RequestService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllRequest();
    this._route.queryParams.forEach(queryParams => {
      if (queryParams['page']) {
        this.page = queryParams['page'];
      }
    });
  }

  private getAllRequest() {
    this._requestService.getAllRequest().subscribe(
      response => {
        this.requests = response.result.requests;
        this.collectionSize = this.requests.length * 5;
        console.log(this.collectionSize);
        this.requests.forEach(element=>{
          this.attachments.push(null);
          this.isLoading = false;
        })
        console.log(response);
      }, error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
  public addFile(attachment: FileList, position: number, requestId: string) {
    this.isLoadingFile = true;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.attachments.splice(position, 1, event.target.result);
      this._requestService.updateRequest(requestId, this.attachments[position]).subscribe(
        response => {
          this.isLoadingFile = false;
          this.requests.splice(position, 1, response.result.request);
        }, 
        error => {
          this.isLoadingFile = false;
          console.log(error);
        }
      );
    };
    reader.readAsDataURL(attachment[0]);
  }

  public removeAttachment(position: number, inputElement: HTMLInputElement) {
    this.attachments[position] = null;
    inputElement.value = null;
  }

  public showSearchResults(event: any): void {
    if (event.target.value.length >= 3) {
      this.searching = true;
    } else {
      this.searching = false;
    }
  }

}
