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
  isLogged: Subject<boolean> = new Subject<boolean>();
  async login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };
    const response = await this.http
      .post<{ token: string }>(`${pageUrl}/api/login/`, data)
      .toPromise();
    localStorage.setItem('token', response.token);
    this.isLogged.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        this.isLogged.next(true);
        return !this.jwtHelper.isTokenExpired(token);
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
