import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { FakeAuthService } from './services/fake-auth/fake-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService = inject(FakeAuthService);
  router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
