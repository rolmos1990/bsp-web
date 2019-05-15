import {  Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import {  ServiceDirective } from '../directives/service.directive';
import {  environment } from 'src/environments/environment';

const API_GET_ALL_REQUEST = 'getAllRequests';

@Injectable()
export class PoliciesService {

    constructor(private _http: HttpClient) { }

    public getAllRequest(): Observable<any> {
        return this._http
          .post(environment.baseUrl.concat(API_GET_ALL_REQUEST), null, ServiceDirective.headers)
          .pipe(
            catchError(err => {
              return ServiceDirective.handleError(err);
            })
          );
    }
}
