import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../auth.selectors';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VerificationGuardService implements CanActivate {
  constructor(public store: Store, private router: Router) {}
  isUser: boolean;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.store.pipe(select(selectUser)).subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/login');
        this.isUser = false;
      } else {
        this.isUser = true;
      }
    });
    return this.isUser;
  }
}
