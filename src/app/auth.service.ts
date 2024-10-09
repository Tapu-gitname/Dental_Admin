import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.staging';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/api/token/`;
  private logoutUrl = `${environment.apiUrl}/api/token/blacklist/`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post(this.logoutUrl, { refresh: refreshToken });
  }

  setSession(authResult: any): void {
    localStorage.setItem('access_token', authResult.access);
    localStorage.setItem('refresh_token', authResult.refresh);
  }

  // getAccessToken(): string | null {
  //   return localStorage.getItem('access_token');
  // }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('access_token');
    } else {
      return null; // Handle accordingly for non-browser environments
    }
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  logoutAndClearSession(): void {
    this.logout().subscribe(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.router.navigate(['/login']);
    });
  }
}
