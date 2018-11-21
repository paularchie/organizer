import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay, filter, tap, map, catchError, share, publishLast, publishReplay, exhaustMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { UserAuthResponse } from '../models/user-auth-response.model';
import { environment } from '../../../environments/environment';
import { User } from '../../../../common/models/user.model';
import { getCookie } from '../util/get-cookie';


const ANONYMOUS_USER: User = {
    id: undefined,
    email: undefined,
};


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userSubject = new BehaviorSubject<User>(undefined);
    user$: Observable<User> = this.userSubject.asObservable().pipe(filter(user => !!user));

    isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
    isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(tap(i => console.log(i)), map(isLoggedIn => !isLoggedIn));
    isAdmin$: Observable<boolean> = this.user$.pipe(map(user => user.roles ? user.roles.indexOf('ADMIN') > -1 : false));


    constructor(private http: HttpClient) { }


    getUser() {
        return this.http.get<User>(`${environment.endPoint}/user`)
            .subscribe(user => this.userSubject.next(user ? user : ANONYMOUS_USER));
    }

    signUp(user: User) {
        return this.http.post<UserAuthResponse>(`${environment.endPoint}/signup`, user)
            .pipe(
                tap(res => this.userSubject.next(res))
            );
    }

    login(email: string, password: string) {
        return this.http.post<UserAuthResponse>(`${environment.endPoint}/login`, { email, password })
            .pipe(
                tap(res => this.userSubject.next(res))
            );
    }

    loginAsUser(email: string) {
        return this.http.post<User>(`${environment.endPoint}/admin`, { email })
            .pipe(
                tap(user => this.userSubject.next(user))
            );
    }

    logout() {
        return this.http.post<any>(`${environment.endPoint}/logout`, null)
            .pipe(
                tap(user => this.userSubject.next(ANONYMOUS_USER))
            );
    }

    checkIfUserExists(detail: any) {
        return this.http.post<any>(`${environment.endPoint}/checkUser`, detail)
            .pipe(
                map(res => res.userExists),
                catchError(err => throwError(err))
            );
    }

    forgotPassword(email: string) {
        return this.http.post<any>(`${environment.endPoint}/forgotPassword`, { email })
            .pipe(
                catchError(err => throwError(err))
            );
    }

    resetPassword(email: string) {
        return this.http.post<any>(`${environment.endPoint}/forgotPassword`, { email })
            .pipe(
                catchError(err => throwError(err))
            );
    }
}





