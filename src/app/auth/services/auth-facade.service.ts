import { AppState } from '../../reducers';
import { AuthErrorTypes } from '../shared/enums/auth-error-types.enum';
import { AuthDataFlowMap } from '../auth-data-flow.map';
import { Facade } from '../../shared/services/facade.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UIEventError } from '../../shared/models/ui-event-error.model';
import { UIUnknownError } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade extends Facade {

  credentialsErrors$: Observable<UIEventError>;

  constructor(store: Store<AppState>, router: Router) {
    super(store, router, AuthDataFlowMap);

    this.credentialsErrors$ = this.errors$.pipe(
      map(err => this.getError(err)));
  }

  private getError(err): UIEventError {
    let error: UIEventError;
    //  if authentication failed, notify the subscribers
    if (err.status === 403) {
      error = {
        type: AuthErrorTypes.IncorrectCredentials,
        payload: true
      }
    } else {
      error = UIUnknownError;
    }

    return error;
  }
}
