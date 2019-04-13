import {  Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import {  ServiceDirective } from '../directives/service.directive';
import {  environment } from 'src/environments/environment';

const API_ENDPOINT_CREDIT_CARD= 'assignCreditcard';
const API_ENDPOINT_DELIVERY_INFO = 'assignDeliverInformation';

@Injectable()
export class PaymentService {

    constructor(private _http: HttpClient) { }

    public assignDeliverInformation(form: any) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_DELIVERY_INFO), form, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

    public assignCreditcard(form: any) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_CREDIT_CARD), form, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }
}
