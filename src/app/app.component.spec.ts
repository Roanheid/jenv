import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { DataService } from './services/data/data.service';
import { DataServiceMock } from './services/data/data.service.mock';
import { FakeAuthService } from './services/fake-auth/fake-auth.service';
import { FakeAuthServiceMock } from './services/fake-auth/fake-auth.service.mock';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ListComponent],
      providers: [
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
        {
          provide: FakeAuthService,
          useClass: FakeAuthServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'jenv' title`, () => {
    expect(component.title).toEqual('jenv');
  });

  it('should logout', () => {
    // GIVEN
    const spy = jest.spyOn((component as any).authService, 'logout');

    // WHEN
    component.logout();

    // THEN
    expect(spy).toHaveBeenCalled();
  });
});
