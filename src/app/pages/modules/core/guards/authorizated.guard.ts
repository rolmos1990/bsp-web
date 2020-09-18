import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizatedGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.isUserAuthorizated) {
            if(state.url.includes("/detalle/")){
                localStorage.setItem("redirectTo", "/detalle" + "/" +route.paramMap.get("requestId") );
            }
            else{
                localStorage.removeItem("redirectTo");
            }
            this._router.navigate(['/login']);
        }
        return this.isUserAuthorizated;
    }
    private get isUserAuthorizated() {
        return !!localStorage.getItem('bspAdminToken');
    }
}
