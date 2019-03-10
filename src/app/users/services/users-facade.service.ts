import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { User } from '../../../../common/models/user.model';
import { UsersDataFlowMap } from '../users-data-flow.map';
import { selectAllUsers } from '../state/users.selectors';
import { UsersEventTypes } from '../models/enums/ui-users-event-types.enum';
import { Facade } from '../../shared/services/facade.service';

@Injectable()
export class UsersFacade extends Facade {

  private _store: Store<AppState>;

  users$: Observable<User[]>;

  constructor(store: Store<AppState>, router: Router) {
    super(store, router, UsersDataFlowMap);
    this._store = store;
    this.defineDataStreams();
    this.handleEvent(UsersEventTypes.UsersPageLoad);
  }

  defineDataStreams() {
    this.users$ = this._store.pipe(select(selectAllUsers));
  }
}
