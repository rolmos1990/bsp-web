import {  Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import {  ServiceDirective } from '../directives/service.directive';
import {  environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

const API_ENDPOINT_CREATE_USER = 'createUser';

@Injectable()
export class UserService {

    constructor(private _http: HttpClient) { }

    public createUser(user: any) : Observable<any> {
      return this._http
        .post(environment.baseUrl.concat(API_ENDPOINT_CREATE_USER), user, ServiceDirective.headers)
        .pipe(
          catchError(err => {
            return ServiceDirective.handleError(err);
          })
        );
    }

}
