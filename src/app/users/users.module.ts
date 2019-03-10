import * as fromUser from '../user.reducer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';
import { NgModule } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { UserGridComponent } from './components/user-container/user-grid/user-grid.component';
import { UsersRoutingModule } from './users-routing.module';
import { AppState } from '../reducers';
import { Router } from '@angular/router';
import { EditUserPopup } from './components/user-container/edit-user-popup/edit-user-popup.component';
import { usersReducer } from './state/users.reducers';
import { UsersFacade } from './services/users-facade.service';
import { UsersService } from './services/users.service';

const createFacade = (store: Store<AppState>, router: Router) => new UsersFacade(store, router);


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    StoreModule.forFeature('users', usersReducer),
    StoreModule.forFeature('user', fromUser.reducer),
    FormsModule

  ],
  declarations: [UserContainerComponent, UserGridComponent, EditUserPopup],
  entryComponents: [EditUserPopup],
  providers: [
    UsersService,
    {
      provide: UsersFacade,
      useFactory: createFacade,
      deps: [Store, Router, UsersService],
    }

  ]
})
export class UsersModule { }
