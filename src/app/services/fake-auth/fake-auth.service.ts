import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthService {
  login(): void {
    const token = btoa('usertoken');
    localStorage.setItem('auth_token', token);
  }
  logout(): void {
    localStorage.removeItem('auth_token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
