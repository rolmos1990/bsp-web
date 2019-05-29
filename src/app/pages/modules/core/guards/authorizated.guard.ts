import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizatedGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.isUserAuthorizated) {
            this._router.navigate(['/login']);
        }
        return this.isUserAuthorizated;
    }
    private get isUserAuthorizated() {
        return !!localStorage.getItem('bspAdminToken');
    }
}
