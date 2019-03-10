import { getCookie } from './util/get-cookie';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
    } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
    ) { }

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
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 0) {
                        // this.router.navigate(['errorpage']);
                    }

                    if (err.status === 401) {
                        // this.router.navigate(['login']);
                    }
                }

            }
        ));
    }
}
