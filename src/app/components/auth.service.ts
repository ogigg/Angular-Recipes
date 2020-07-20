import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Store, select } from '@ngrx/store';

import { pageUrl } from './api.service';
import { User } from './models/user.model';
import { selectUser } from './login/auth.selectors';
import { AuthState } from './login/auth.reducers';
import { logout } from './login/auth.actions';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private store: Store<AuthState>
  ) {}
  public isLoggedIn: Subject<boolean> = new Subject<boolean>();
  async login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };
    const response = await this.http
      .post<{ user: User; success: boolean }>(`${pageUrl}/api/login/`, data)
      .toPromise();
    return response;
  }
  public async loginFb(fbToken: string) {
    const data = {
      fbToken: fbToken,
    };
    const response = await this.http
      .post<{ user: User; success: boolean }>(
        `${pageUrl}/api/login/facebook`,
        data
      )
      .toPromise();
    return response;
  }
  public getToken(): string {
    const user = localStorage.getItem('user');
    if (user) {
      const token = JSON.parse(user).token;
      return token;
    }
    return null;
  }
  user$: Observable<User>;
  user: User = null;
  public async isAuthenticated(): Promise<boolean> {
    this.store.pipe(select(selectUser)).subscribe((user) => (this.user = user));
    if (this.user?.token) {
      let isAuthenticated = false;
      new Observable((observer) =>
        observer.next(!this.jwtHelper.isTokenExpired(this.user.token))
      ).subscribe(
        (resp: boolean) => (isAuthenticated = resp),
        (err) => this.store.dispatch(logout())
      );
      return isAuthenticated;
    }

    return false;
  }
}
