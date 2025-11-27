import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { DataService } from './services/data.service';
import { DataServiceMock } from './services/data.service.mock';

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
});
