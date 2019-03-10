import { ANONYMOUS_USER } from '../../shared/constants';
import { AuthActionTypes } from '../shared/enums/auth-action-types.enum';
import { User } from '../../../../common/models/user.model';


export interface AuthState {
  isLoggedIn: boolean,
  user: User
};

const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: ANONYMOUS_USER
};


export function authReducer(state = initialAuthState, action: any): AuthState {

  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        isLoggedIn: !!action.payload.user,
        user: action.payload.user
      }

    case AuthActionTypes.LogoutAction:
      return initialAuthState;

    default:
      return state;
  }
}