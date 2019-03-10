import * as fromAccount from './state/auth.reducer';
import { AccountRoutingModule } from './auth-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { AuthComponent } from './components/auth.component';
import { AuthFacade } from './services/auth-facade.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppState } from '../reducers';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { CommonComponentsModule } from '../shared/modules/common-components/common-components.module';
import { MaterialModule } from '../shared/modules/material.module';


const createFacade = (store: Store<AppState>, router: Router) => new AuthFacade(store, router);


@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    CommonComponentsModule,
    StoreModule.forFeature('auth', fromAccount.authReducer),
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    AuthComponent,
    AdminComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  providers: [
    {
      provide: AuthFacade,
      useFactory: createFacade,
      deps: [
        Store,
        Router,
        AuthService
      ]
    }
  ]
})
export class AuthModule { }
