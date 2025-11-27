import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FakeAuthService } from './services/fake-auth/fake-auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'jenv';
  private authService = inject(FakeAuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
