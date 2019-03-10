import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { DemoModule } from './demo/demo.module';
import { ErrorPageComponent } from './shared/modules/common-components/error-page/error-page.component';

// TODO: implement lazy loading
const routes: Routes = [
  { path: 'account', loadChildren: () => AuthModule },
  { path: 'notes', loadChildren: () => NotesModule,/* canActivate: ['authenticationGuard'] */ },
  { path: 'users', loadChildren: () => UsersModule/*, canActivate: ['adminOnlyGuard'] */ },
  { path: 'errorpage', component: ErrorPageComponent },
  { path: 'demo', loadChildren: () => DemoModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
