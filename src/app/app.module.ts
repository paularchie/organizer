import { Actions, EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppState, metaReducers, reducers } from './reducers';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { AuthModule } from './auth/auth.module';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { AuthService } from './shared/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { Interceptor } from './shared/http-interceptor';
import { MaterialModule } from './shared/modules/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationItemComponent } from './navigation/navigation-item/navigation-item.component';
import { NotesModule } from './notes/notes.module';
import { RbacAllowDirective } from './shared/directives/rbac-allow.directive';
import { Router } from '@angular/router';
import { State, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserRoles } from './shared/constants';
import { UsersModule } from './users/users.module';
import { ErrorPageComponent } from './shared/modules/common-components/error-page/error-page.component';

import { ToastrModule } from 'ngx-toastr';


export function createAdminOnlyGuard(router: Router, store: State<AppState>) {
  debugger
  return new AuthorizationGuard([UserRoles.ADMIN], router, store);
}

export function createAuthenicationGuard(store: State<AppState>, router: Router) {
  return new AuthenticationGuard(store, router);
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RbacAllowDirective,
    NavigationItemComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    AuthModule,
    NotesModule,
    UsersModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-COOKIE',
      headerName: 'x-xsrf-token'
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),

    // StoreRouterConnectingModule.forRoot({ stateKey: 'router' })

  ],
  providers: [
    AuthService,
    {
      provide: 'adminOnlyGuard',
      useFactory: createAdminOnlyGuard,
      deps: [
        Router,
        State,
        AuthService,
      ]
    },
    {
      provide: 'authenticationGuard',
      useFactory: createAuthenicationGuard,
      deps: [
        State,
        Router
      ],
    },
    Actions,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    // { provide: RouterStateSerializer, useClass: CustomSerializer },

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
