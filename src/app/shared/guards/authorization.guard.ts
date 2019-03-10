import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
    } from '@angular/router';
import { AppState } from '../../reducers';
import { currentUser } from '../../auth/state/auth.selectors';
import { first, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { intersection } from 'lodash';
import { Observable } from 'rxjs';
import { select, State } from '@ngrx/store';



@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(
        private allowedRoles: string[],
        private router: Router,
        private store: State<AppState>
    ) { }


    canActivate(): Observable<boolean> {
        return this.store.pipe(
            select(currentUser),
            map(user => intersection(this.allowedRoles, user.roles).length > 0),
            first(),
            tap(allowed => {
                if (!allowed) {
                    this.router.navigateByUrl('/login');
                }
            }), );
    }

}