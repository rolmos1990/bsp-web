import {  Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import {  ServiceDirective } from '../directives/service.directive';
import {  environment } from 'src/environments/environment';

const API_ENDPOINT_GET_ALL_OCCUPATIONS = 'getAllOccupations';

@Injectable()
export class ActivityService {

    constructor(private _http: HttpClient) { }

    public getAllOcupations(): Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_GET_ALL_OCCUPATIONS), null, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }
}
