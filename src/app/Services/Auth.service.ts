import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Patient } from '../../assets/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8080/auth'; // Backend API URL
  private token: string | null = null;
  private refreshToken: string | null = null;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/token`, { username, password });
  }

  saveToken(token: string, refreshToken: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
    this.token = token;
    this.refreshToken = refreshToken;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId) && !this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId) && !this.refreshToken) {
      this.refreshToken = localStorage.getItem('refreshToken');
    }
    return this.refreshToken;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }
}
