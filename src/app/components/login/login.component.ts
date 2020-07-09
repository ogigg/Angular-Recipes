import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

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
    activatedRoute: ActivatedRoute
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
  private redirectUrl = '/';
  private snackBarMessage: string = '';
  ngOnInit(): void {}

  async login(form) {
    const response = await this.authService.login(
      form.value.email,
      form.value.password
    );
    if (response.success === true) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.snackBar.open(this.snackBarMessage, 'OK', {
        duration: 2000,
      });
    }
  }
}
