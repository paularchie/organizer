
import { tap, first, map } from 'rxjs/operators';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { intersection } from 'lodash';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {


    constructor(private allowedRoles: string[],
        private authService: AuthService, private router: Router) {

    }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.authService.user$.pipe(
            map(user => intersection(this.allowedRoles, user.roles).length > 0),
            first(),
            tap(allowed => {
                if (!allowed) {
                    this.router.navigateByUrl('/');
                }
            }), );


    }

}