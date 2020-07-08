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
    console.log(token);
    this.isTokenExpired(token);
    return true;
    // console.log(this.jwtHelper.decodeToken(token));
    // console.log(this.jwtHelper.isTokenExpired(token));
    // return !this.jwtHelper.isTokenExpired(token);
  }
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}
