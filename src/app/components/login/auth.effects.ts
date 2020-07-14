import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, logout } from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { clearRecipes, loadAllRecipes } from '../recipes/recipes.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        tap((action) => {
          localStorage.setItem('user', JSON.stringify(action.user));
          // this.store.dispatch(loadAllRecipes());
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap((action) => {
          localStorage.removeItem('user');
          this.store.dispatch(clearRecipes());
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
