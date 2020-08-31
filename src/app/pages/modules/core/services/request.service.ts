import {  Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import {  ServiceDirective } from '../directives/service.directive';
import {  environment } from 'src/environments/environment';

const API_ENDPOINT_CREATE_NEW_REQUEST = 'createNewRequest';
const API_ENDPOINT_GET_REQUEST = 'getRequest';
const API_ENDPOINT_SAVE_REQUEST = 'saveRequest';
const API_ENDPOINT_SAVE_CANCER_REQUEST = 'saveCancerRequest';
const API_ENDPOINT_FINISH_REQUEST = 'finishRequest';
const API_ENDPOINT_UPDATE_REQUEST = 'updateRequest';
const API_GET_ALL_REQUEST = 'getPaginatedRequests';

@Injectable()
export class RequestService {

    constructor(private _http: HttpClient) { }

    public saveRequest(form: any, insuranceType: any) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat((insuranceType === 'cancer') ? API_ENDPOINT_SAVE_CANCER_REQUEST : API_ENDPOINT_SAVE_REQUEST), form, ServiceDirective.headers)
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

    public getAllRequest(payload: Object): Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_GET_ALL_REQUEST), payload, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    public createNewRequest(insuranceId: string, userId: string) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_CREATE_NEW_REQUEST), {insuranceId:insuranceId, userId:userId, same: localStorage.getItem('same') === 'true'}, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    public updateRequest(payload): Observable<any>{
      const _body = {...payload, status: "Emitida"};
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_UPDATE_REQUEST),_body, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    public getRequest(requestId: string): Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_GET_REQUEST), {requestId: requestId}, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    /* remove only for test purporsed */
    public testPayment(): Observable<any> {
      return this._http
        .get("http://localhost:3000/payments")
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

}
