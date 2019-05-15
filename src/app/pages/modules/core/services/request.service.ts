import {  Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import {  ServiceDirective } from '../directives/service.directive';
import {  environment } from 'src/environments/environment';

const API_ENDPOINT_CREATE_NEW_REQUEST = 'createNewRequest';
const API_ENDPOINT_GET_REQUEST = 'getRequest';
const API_ENDPOINT_SAVE_REQUEST = 'saveRequest';
const API_ENDPOINT_FINISH_REQUEST = 'finishRequest';
const API_ENDPOINT_UPDATE_REQUEST = 'updateRequest';
const API_GET_ALL_REQUEST = 'getAllRequests';

@Injectable()
export class RequestService {

    constructor(private _http: HttpClient) { }

    public saveRequest(form: any) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_SAVE_REQUEST), form, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    public finishRequest(form: any) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_FINISH_REQUEST), form, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    public getAllRequest(): Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_GET_ALL_REQUEST), null, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    public createNewRequest(insuranceId: string, userId: string) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_CREATE_NEW_REQUEST), {insuranceId:insuranceId, userId:userId}, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    public updateRequest(requestId: string, file: any): Observable<any>{
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_UPDATE_REQUEST), {requestId: requestId, policyFile: file}, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    public getRequest(requestId: string) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_GET_REQUEST), {requestId:requestId}, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

}
