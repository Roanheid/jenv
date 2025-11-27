import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FakeAuthService } from './services/fake-auth/fake-auth.service';
import { FakeAuthServiceMock } from './services/fake-auth/fake-auth.service.mock';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jest.Mocked<FakeAuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: FakeAuthService, useClass: FakeAuthServiceMock },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(
      FakeAuthService
    ) as jest.Mocked<FakeAuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should allow activation if user is logged in', () => {
    // GIVEN
    authService.isLoggedIn.mockReturnValue(true);

    // WHEN
    const result = guard.canActivate();

    // THEN
    expect(result).toBe(true);
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('should redirect to login if user is not logged in', () => {
    // GIVEN
    authService.isLoggedIn.mockReturnValue(false);

    // WHEN
    const result = guard.canActivate();

    // THEN
    expect(result).toBe(false);
    expect(authService.isLoggedIn).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
