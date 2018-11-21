import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { shareReplay, catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users$: Observable<User[]> = this.getUsers().pipe(shareReplay());

  constructor(private http: HttpClient) {
  }

  private getUsers() {
    return this.http.get<User[]>(`${environment.endPoint}/users`, this.getHeaders())
      .pipe(
        map((res: any) => res.users),
        shareReplay(),
        catchError(err => throwError(err))
      );
  }

  // TODO: move this to the shared folder
  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return {
      headers,
      withCredentials: true
    };
  }
}
