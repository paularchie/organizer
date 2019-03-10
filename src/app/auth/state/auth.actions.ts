import { Action } from '@ngrx/store';
import { AuthActionTypes } from '../shared/enums/auth-action-types.enum';
import { LoginCredentials, User } from '../../../../common/models/user.model';

export class AttemptLogin implements Action {
  readonly type = AuthActionTypes.AttemptLoginAction;

  constructor(public payload: { credentials: LoginCredentials }) { }
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: { user: User }) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SignupAction;

  constructor(public payload: { user: User }) { };
}

export class LoginAsUser implements Action {
  readonly type = AuthActionTypes.LoginAsUserAction;

  constructor(public payload: { userEmail: string }) { }
}


export type AuthActions =
  AttemptLogin
  | Logout
  | Login
  // | Signup;
