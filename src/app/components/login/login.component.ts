import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FacebookLoginProvider,
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { login } from './auth.actions';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    translate: TranslateService,
    activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private socialAuthService: SocialAuthService
  ) {
    activatedRoute.queryParams.subscribe((params) => {
      if (params.returnUrl) {
        this.redirectUrl = params.returnUrl;
      }
    });
    translate.get('login-snackbar').subscribe((res: string) => {
      this.snackBarMessage = res;
    });
  }
  private redirectUrl = '/dashboard';
  private snackBarMessage: string = '';

  ngOnInit(): void {}

  handleFbClick(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.signInWithFB(user.authToken);
      }
    });
  }

  async handleGoogleClick(): Promise<void> {
    const user: SocialUser = await this.socialAuthService.signIn(
      GoogleLoginProvider.PROVIDER_ID
    );

    const response = await this.authService.loginGoogle(user.authToken);
    if (response.success === true) {
      this.store.dispatch(login({ user: response.user }));
      this.router.navigate([this.redirectUrl]);
    } else {
      this.snackBar.open(this.snackBarMessage, 'OK', {
        duration: 2000,
      });
    }
  }

  async signInWithFB(token: string): Promise<void> {
    const response = await this.authService.loginFb(token);
    if (response.success === true) {
      this.store.dispatch(login({ user: response.user }));
      this.router.navigate([this.redirectUrl]);
    } else {
      this.snackBar.open(this.snackBarMessage, 'OK', {
        duration: 2000,
      });
    }
  }

  onSubmit(form) {
    this.login(form.value.email, form.value.password);
  }

  private async login(username, password) {
    const response = await this.authService.login(username, password);
    if (response.success === true) {
      this.store.dispatch(login({ user: response.user }));
      this.router.navigate(['/login/2fa']); //[this.redirectUrl]);
    } else {
      this.snackBar.open(this.snackBarMessage, 'OK', {
        duration: 2000,
      });
    }
  }
}
