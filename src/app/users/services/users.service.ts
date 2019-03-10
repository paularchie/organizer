import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { User } from '../../../../common/models/user.model';

@Injectable()
export class UsersService {

  static http: HttpClient;

  constructor(private https: HttpClient) {
    UsersService.http = this.https;
  }

  static getUsers() {
    return UsersService.http.get<User[]>(`${environment.endPoint}/users`).pipe(
      map((res: any) => res.users),
      catchError(err => throwError(err))
    );
  }

  static updateUsers(users: User[]) {
    return UsersService.http.post<User[]>(`${environment.endPoint}/users`, users).pipe(
      tap((res: any) => console.log('res', res)),
      catchError(err => throwError(err))
    );
  }

  getUserById() {
    return UsersService.http.get<User>(`${environment.endPoint}/user`);
  }
}
