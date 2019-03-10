import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials, User } from '../../../../common/models/user.model';
import { Observable, throwError } from 'rxjs';
import {
    catchError,
    map,
    } from 'rxjs/operators';
import { UserAuthResponse } from '../../auth/shared/models/user-auth-response.model';


@Injectable()
export class AuthService {

    private static http: HttpClient;

    constructor(http: HttpClient) {
        AuthService.http = http;
    }

    static getUser() {
        return AuthService.http.get<User>(`${environment.endPoint}/user`);
    }

    static signUp(user: User) {
        return AuthService.http.post<UserAuthResponse>(`${environment.endPoint}/signup`, user)
    }

    static login(credentials: LoginCredentials): Observable<any> {
        return AuthService.http.post<UserAuthResponse>(`${environment.endPoint}/login`, credentials);
    }

    static loginAsUser(value: any) {
        return AuthService.http.post<User>(`${environment.endPoint}/admin`, { email: value.email })
    }

    static logout() {
        return AuthService.http.post<UserAuthResponse>(`${environment.endPoint}/logout`, null)
    }

    static checkIfUserExists(detail: any) {
        return AuthService.http.post<any>(`${environment.endPoint}/checkUser`, detail)
            .pipe(
                map(res => res.userExists),
                catchError(err => throwError(err))
            );
    }

    static forgotPassword(email: string) {
        return AuthService.http.post<any>(`${environment.endPoint}/forgotPassword`, { email })
            .pipe(
                catchError(err => throwError(err))
            );
    }

    static resetPassword(email: string) {
        return AuthService.http.post<any>(`${environment.endPoint}/forgotPassword`, { email })
            .pipe(
                catchError(err => throwError(err))
            );
    }
}





