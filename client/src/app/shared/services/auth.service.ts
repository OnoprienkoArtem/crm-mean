import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { User } from '../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;

  constructor(private http: HttpClient) {
  }

  private setToken(token: string | null) {
    this.token = token;
  }

  private getToken(): string | null {
    return this.token;
  }

  private isAuthenticated(): boolean {
    return !!this.token;
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  public login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        })
      );
  }

  public logout(): void {
    this.setToken(null);
    localStorage.clear();
  }
}
