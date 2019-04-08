import {  Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import {  ServiceDirective } from '../directives/service.directive';
import {  environment } from 'src/environments/environment';

const API_ENDPOINT_CREATE_NEW_REQUEST = 'createNewRequest';

@Injectable()
export class CreateNewRequestService {

    constructor(private _http: HttpClient) { }

    public createNewRequest(insuranceId, userId: string) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_CREATE_NEW_REQUEST), {insuranceId:insuranceId, userId:userId}, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }
}
