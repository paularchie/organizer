import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { State, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { isLoggedIn } from "../../auth/state/auth.selectors";

Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private store: State<AppState>,
        private router: Router
    ) {}


    canActivate(): Observable<boolean> {

        return this.store.pipe(
            select(isLoggedIn),
            tap(isLoggedIn => {
                if (!isLoggedIn) {
                    this.router.navigateByUrl('/login');
                }
            })
        );
    }

}

