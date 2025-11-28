import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FakeAuthService } from './services/fake-auth/fake-auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'jenv';
  private readonly authService = inject(FakeAuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
