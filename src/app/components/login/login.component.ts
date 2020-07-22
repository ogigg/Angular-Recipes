import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { login } from './auth.actions';
import { loadAllRecipes } from '../recipes/recipes.actions';
import { ApiService } from '../api.service';

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
    private store: Store<AppState>
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

  async login(form) {
    const response = await this.authService.login(
      form.value.email,
      form.value.password
    );
    if (response.success === true) {
      this.store.dispatch(login({ user: response.user }));
      this.router.navigate(['/login/2fa']);
    } else {
      this.snackBar.open(this.snackBarMessage, 'OK', {
        duration: 2000,
      });
    }
  }
}
