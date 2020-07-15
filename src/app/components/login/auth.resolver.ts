import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectUser, selectIsLoggedIn, selectHasToken } from './auth.selectors';
import { User } from '../models/user.model';

@Injectable()
export class AuthResolver implements Resolve<boolean> {
  constructor(private store: Store, private router: Router) {
    this.store.pipe(select(selectUser)).pipe(
      tap((user) => {
        console.log(user);
        if (user === null) {
          this.router.navigateByUrl('/login');
          this.isUser$ = of(false);
        } else {
          this.isUser$ = of(true);
        }
      })
    );
  }
  private user: User;
  private isUser$: Observable<boolean>;
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return of(true);
  }
}
