import { Directive } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Response, Headers } from '@angular/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Directive({
    selector: '[mServiceDirective]',
})
export class ServiceDirective {
    static handleError(error: HttpErrorResponse) {
        return throwError(error.error);
    }

    static get headers(): { headers: HttpHeaders } {
        const headers = new HttpHeaders({
            'X-Parse-Application-Id': environment.paseApplicationId,
            'Content-Type': environment.contentType
        });
        return { headers: headers };
    }

}