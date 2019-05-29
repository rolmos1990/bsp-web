import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class PublicGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.isUserAuthorizated) {
            this._router.navigate(['/polizas']);
        }
        return !this.isUserAuthorizated;
    }
    private get isUserAuthorizated() {
        return !!localStorage.getItem('bspAdminToken');
    }
}
