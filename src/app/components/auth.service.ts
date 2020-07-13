import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pageUrl } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, Observable } from 'rxjs';
import { User } from './models/user.model';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { selectUser } from './login/auth.selectors';
import { AuthState } from './login/auth.reducers';
import { logout } from './login/auth.actions';

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
    // if (response.success) {
    //   localStorage.setItem('token', response.user.token);
    //   this.isLoggedIn.next(true);
    // }
    return response;
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.store.dispatch(logout());
    this.isLoggedIn.next(false);
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
    this.store.pipe(select(selectUser)).subscribe((s) => (this.user = s));
    if (this.user) {
      if (this.user.token) {
        try {
          // this.isLoggedIn.next(true);
          return !this.jwtHelper.isTokenExpired(this.user.token);
        } catch (error) {
          this.store.dispatch(logout());
          return false;
        }
      }
    }

    return false;
  }
}
