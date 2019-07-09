import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ServiceDirective } from '../directives/service.directive';
import { environment } from 'src/environments/environment';

const API_ENDPOINT_GET_ALL_NATIONALITIES = 'getAllNationalities';
const API_ENDPOINT_GET_ALL_PROVINCES = 'getAllProvinces';
const API_ENDPOINT_GET_ALL_DISTRICTS = 'getAllDistricts';
const API_ENDPOINT_GET_ALL_CORREGIMIENTOS = 'getAllCorregimientos';
const API_ENDPOINT_GET_ALL_COUNTRIES = 'getAllCountries';

@Injectable()
export class LocationService {


  constructor(private _http: HttpClient) { }

  public getAllNationalites(): Observable<any> {
    return this._http
      .post(environment.baseUrl.concat(API_ENDPOINT_GET_ALL_NATIONALITIES), null, ServiceDirective.headers)
      .pipe(
        catchError(err => {
          return ServiceDirective.handleError(err);
        })
      );
  }

  public getAllProvinces(): Observable<any> {
    return this._http
      .post(environment.baseUrl.concat(API_ENDPOINT_GET_ALL_PROVINCES), null, ServiceDirective.headers)
      .pipe(
        catchError(err => {
          return ServiceDirective.handleError(err);
        })
      );
  }

  public getAllDistricts(provinceId: string): Observable<any> {
    return this._http
      .post(environment.baseUrl.concat(API_ENDPOINT_GET_ALL_DISTRICTS), { provinceId: provinceId }, ServiceDirective.headers)
      .pipe(
        catchError(err => {
          return ServiceDirective.handleError(err);
        })
      );
  }

  public getAllCorregimientos(districtId: string): Observable<any> {
    return this._http
      .post(environment.baseUrl.concat(API_ENDPOINT_GET_ALL_CORREGIMIENTOS), { districtId: districtId }, ServiceDirective.headers)
      .pipe(
        catchError(err => {
          return ServiceDirective.handleError(err);
        })
      );
  }

  public getAllCountries(): Observable<any> {
    return this._http
      .post(environment.baseUrl.concat(API_ENDPOINT_GET_ALL_COUNTRIES),{},  ServiceDirective.headers)
      .pipe(
        catchError(err => {
          return ServiceDirective.handleError(err);
        })
      );
  }

}
