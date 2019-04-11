import {  Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import {  ServiceDirective } from '../directives/service.directive';
import {  environment } from 'src/environments/environment';

const API_ENDPOINT_CREATE_DEPENDENT = 'createDependent';
const API_ENDPOINT_UPDATE_DEPENDENT = 'updateDependent';
const API_ENDPOINT_DELETE_DEPENDENT = 'deleteDependent';
const API_ENDPOINT_GET_DEPENDENTS_BY_REQUEST = 'getDependentsByRequest';

@Injectable()
export class DependentService {

    constructor(private _http: HttpClient) { }

    public createDependent(form: any) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_CREATE_DEPENDENT), form, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    public updateDependent(form: any) : Observable<any> {
        return this._http
          .post(environment.baseUrl.concat(API_ENDPOINT_UPDATE_DEPENDENT), form, ServiceDirective.headers)
          .pipe(
            catchError(err => {
              return ServiceDirective.handleError(err);
            })
          );
      }

      public deleteDependents(dependentId: string, requestId: string) : Observable<any> {
        return this._http
          .post(environment.baseUrl.concat(API_ENDPOINT_DELETE_DEPENDENT), {dependentId: dependentId, requestId: requestId}, ServiceDirective.headers)
          .pipe(
            catchError(err => {
              return ServiceDirective.handleError(err);
            })
          );
      }
      
      public getDependentsByRequest(requestId: string) : Observable<any> {
        return this._http
          .post(environment.baseUrl.concat(API_ENDPOINT_GET_DEPENDENTS_BY_REQUEST), {requestId: requestId}, ServiceDirective.headers)
          .pipe(
            catchError(err => {
              return ServiceDirective.handleError(err);
            })
          );
      }
      
}
