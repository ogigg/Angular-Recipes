import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  public hide: boolean = true;

  ngOnInit(): void {}

  async login(form) {
    const response = await this.authService.login(
      form.value.email,
      form.value.password
    );
    if (response.success === true) {
      this.router.navigate(['/']);
    } else {
      this._snackBar.open('Bad login/password!', 'OK', {
        duration: 2000,
      });
    }
  }
}
