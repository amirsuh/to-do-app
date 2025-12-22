import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private apiUrl = 'https://your-api.com/auth';

  // Signals to track tokens
  accessToken = signal<string | null>(null);
  refreshToken = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap(tokens => {
        this.accessToken.set(tokens.accessToken);
        this.refreshToken.set(tokens.refreshToken);
        sessionStorage.setItem('accessToken', tokens.accessToken);
        sessionStorage.setItem('refreshToken', tokens.refreshToken);
      })
    );
  }

  refresh() {
    return this.http.post<{ accessToken: string }>(
      `${this.apiUrl}/refresh`,
      { refreshToken: this.refreshToken() }
    ).pipe(
      tap(token => {
        this.accessToken.set(token.accessToken);
        sessionStorage.setItem('accessToken', token.accessToken);
      })
    );
  }

  logout() {
    this.accessToken.set(null);
    this.refreshToken.set(null);
    sessionStorage.clear();
  }

}
