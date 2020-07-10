import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { User } from '../models/user.model';
import { login, logout } from './auth.actions';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(login, (state, action) => {
    return {
      user: action.user,
    };
  }),

  on(logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);
