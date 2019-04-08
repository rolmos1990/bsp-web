import {  Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import {  ServiceDirective } from '../directives/service.directive';
import {  environment } from 'src/environments/environment';

@Injectable()
export class CoverageService {

    private API_ENDPOINT_GET_ALL_COVERAGES = 'getAllInsurance';

    constructor(private _http: HttpClient) { }

    public getAllConverages() : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(this.API_ENDPOINT_GET_ALL_COVERAGES), null, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

}
