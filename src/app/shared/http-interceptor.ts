import { AuthService } from './services/auth.service';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpHeaders,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getCookie } from './util/get-cookie';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        // if the user is authenticated, always attach x-xsrf-token header
        // to protect the end points against CSRF attacks
        let cookie = getCookie('XSRF-TOKEN')

        if (cookie) {
            headers = headers.append('x-xsrf-token', cookie);
        }

        request = request.clone({
            headers,
            withCredentials: true
        });

        request.clone()

        return next.handle(request).pipe(tap(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response 
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 0) {
                        this.router.navigate(['errorpage']);
                    }
                    
                    if (err.status === 401) {
                        this.router.navigate(['login']);
                    }
                }

            }
        ));
    }
}
