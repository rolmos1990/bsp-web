import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ServiceDirective } from '../directives/service.directive';
import { environment } from 'src/environments/environment';

const API_ENDPOINT_CREATE_USER = 'createUser';
const API_ENDPOINT_LOGIN = 'logIn';
const API_ENDPOINT_PASSWORDRECOVERYEMAIL = 'passwordRecoveryEmail';
const API_ENDPOINT_VALIDATE_GUID = 'validateGuid';
const API_ENDPOINT_UPDATE_PASSWORD = 'updatePassword';

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  public createUser(user: any): Observable<any> {
    return this._http
      .post(environment.baseUrl.concat(API_ENDPOINT_CREATE_USER), user, ServiceDirective.headers)
      .pipe(
        catchError(err => {
          return ServiceDirective.handleError(err);
        })
      );
  }

  public logIn(username: string, password: string): Observable<any> {
    return this._http
      .post(environment.baseUrl.concat(API_ENDPOINT_LOGIN), { username: username, password: password }, ServiceDirective.headers)
      .pipe(
        catchError(err => {
          return ServiceDirective.handleError(err);
        })
      );
  }

  public passwordRecoveryEmail(credential: any): Observable<any> {
    return this._http
      .post(environment.baseUrl.concat(API_ENDPOINT_PASSWORDRECOVERYEMAIL), credential, ServiceDirective.headers)
      .pipe(
        catchError(err => {
          return ServiceDirective.handleError(err);
        })
      );
  }

  public updatePassword(body: any): Observable<any> {
    return this._http
      .post(environment.baseUrl.concat(API_ENDPOINT_UPDATE_PASSWORD), body, ServiceDirective.headers)
      .pipe(
        catchError(err => {
          return ServiceDirective.handleError(err);
        })
      );
  }

  public validateGuid(body: any): Observable<any> {
    return this._http
      .post(environment.baseUrl.concat(API_ENDPOINT_VALIDATE_GUID), body, ServiceDirective.headers)
      .pipe(
        catchError(err => {
          return ServiceDirective.handleError(err);
        })
      );
  }

}
