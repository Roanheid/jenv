import { TestBed } from '@angular/core/testing';
import { FakeAuthService } from './fake-auth.service';

describe('FakeAuthService', () => {
  let service: FakeAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeAuthService);
  });

  afterEach(() => {
    // make sure local storage is cleared after each test
    localStorage.removeItem('auth_token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    // GIVEN
    expect(service.isLoggedIn()).toBeFalsy();

    // WHEN
    service.login();

    // THEN
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should logout', () => {
    // GIVEN
    localStorage.setItem('auth_token', 'testtoken');
    expect(service.isLoggedIn()).toBeTruthy();

    // WHEN
    service.logout();

    // THEN
    expect(service.isLoggedIn()).toBeFalsy();
  });
});
