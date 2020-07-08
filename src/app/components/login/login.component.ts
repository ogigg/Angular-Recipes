import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
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
      alert('Bad login/password!');
    }
  }
}
