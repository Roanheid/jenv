import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataService } from '../../services/data/data.service';
import { DataServiceMock } from '../../services/data/data.service.mock';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight text', () => {
    // GIVEN
    const find = fixture.nativeElement.querySelector('#find');

    // WHEN
    find.value = 'te';
    find.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // THEN
    expect((component as any).dataService.highlightedText()).toEqual('te');
  });
});
