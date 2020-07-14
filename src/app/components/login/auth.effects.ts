import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, withLatestFrom, filter } from 'rxjs/operators';

import { User } from '../models/user.model';
import { login, logout } from './auth.actions';
import { selectIsLoggedIn } from './auth.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  public login$: Observable<{ user: User }> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        tap((action) => {
          withLatestFrom(this.store.select(selectIsLoggedIn)),
            filter(([_, loaded]) => !loaded),
            localStorage.setItem('user', JSON.stringify(action.user));
        })
      ),
    { dispatch: false }
  );

  public logout$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store
  ) {}
}
