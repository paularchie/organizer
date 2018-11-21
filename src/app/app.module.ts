import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';
import { MaterialModule } from './shared/modules/material.module';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { NotesModule } from './notes/notes.module';
import { AuthService } from './shared/services/auth.service';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { Router } from '@angular/router';
import { RbacAllowDirective } from './shared/directives/rbac-allow.directive';
import { NavigationItemComponent } from './navigation/navigation-item/navigation-item.component';
import { UserRoles } from './shared/constants';
import { UsersModule } from './users/users.module';
import { Interceptor } from './shared/http-interceptor';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';


require('hammerjs');

export function createAdminOnlyGuard(authService: AuthService, router: Router) {
  return new AuthorizationGuard([UserRoles.ADMIN], authService, router);
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
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    AccountModule,
    NotesModule,
    UsersModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-COOKIE',
      headerName: 'x-xsrf-token'
    }),
  ],
  providers: [
    {
      provide: 'adminOnlyGuard',
      useFactory: createAdminOnlyGuard,
      deps: [
        AuthService,
        Router
      ]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
