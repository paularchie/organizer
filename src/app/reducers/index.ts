import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer } from '../auth/state/auth.reducer';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';



export interface AppState {
  // auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  // reducer: routerReducer
  auth: authReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
