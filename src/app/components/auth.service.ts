import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pageUrl } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };
    return this.http
      .post<{ token: string }>(`${pageUrl}/api/login/`, data)
      .subscribe((res) => localStorage.setItem('token', res.token));
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return !this.jwtHelper.isTokenExpired(token);
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
