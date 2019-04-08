import {  Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import {  ServiceDirective } from '../directives/service.directive';
import {  environment } from 'src/environments/environment';

@Injectable()
export class finishRequest {

    private API_ENDPOINT_FINISH_REQUEST = 'finishRequest';

    constructor(private _http: HttpClient) { }

    public finishRequest(form: any) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(this.API_ENDPOINT_FINISH_REQUEST), form, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

}
