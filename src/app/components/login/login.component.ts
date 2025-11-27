import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FakeAuthService } from '../../services/fake-auth/fake-auth.service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule],
  standalone: true,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(FakeAuthService);
  private router = inject(Router);

  handleLogin(): void {
    this.authService.login();
    this.router.navigate(['/list']);
  }
}
