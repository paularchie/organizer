import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountModule } from './account/account.module';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

// TODO: implement lazy loading
const routes: Routes = [
  { path: 'account', loadChildren: () => AccountModule },
  { path: 'notes', loadChildren: () => NotesModule },
  { path: 'users', loadChildren: () => UsersModule, canActivate: ['adminOnlyGuard'] },
  { path: 'errorpage', component: ErrorPageComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
