import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {}
  public hide: boolean = true;

  ngOnInit(): void {}

  async login(form) {
    console.log(form.value);
    const response = await this.apiService
      .login(form.value.email, form.value.password)
      .toPromise();
    if (response.status) {
      alert('Zalogowano!');
    } else {
      alert('Złe dane');
    }
  }
}
