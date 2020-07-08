import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pageUrl } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}
  public isLoggedIn: Subject<boolean> = new Subject<boolean>();
  async login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };
    const response = await this.http
      .post<{ token: string; success: boolean }>(`${pageUrl}/api/login/`, data)
      .toPromise();
    if (response.success) {
      localStorage.setItem('token', response.token);
      this.isLoggedIn.next(true);
    }
    return response;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        this.isLoggedIn.next(true);
        return !this.jwtHelper.isTokenExpired(token);
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
