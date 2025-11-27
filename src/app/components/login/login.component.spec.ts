import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { FakeAuthService } from '../../services/fake-auth/fake-auth.service';
import { FakeAuthServiceMock } from '../../services/fake-auth/fake-auth.service.mock';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: FakeAuthService, useClass: FakeAuthServiceMock },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle login', () => {
    // GIVEN
    const loginSpy = jest.spyOn((component as any).authService, 'login');
    const routerpy = jest.spyOn((component as any).router, 'navigate');

    // WHEN
    fixture.nativeElement.querySelector('#login-btn').click();

    // THEN
    expect(loginSpy).toHaveBeenCalled();
    expect(routerpy).toHaveBeenCalledWith(['/list']);
  });
});
