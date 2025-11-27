import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { DataServiceMock } from '../../services/data/data.service.mock';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new item to list', () => {
    // GIVEN
    expect(component.items().length).toEqual(2);
    const input = fixture.nativeElement.querySelector('#input');
    const button = fixture.nativeElement.querySelector('#input-btn');

    // WHEN
    input.value = 'Item 3';
    input.dispatchEvent(new Event('input'));
    button.click();

    // THEN
    expect(component.items().length).toEqual(3);
    expect(component.items()[2]).toEqual({ name: 'item-3', value: 'Item 3' });
  });

  it('should not add a new item to the list if input field is empty', () => {
    // GIVEN
    expect(component.items().length).toEqual(2);
    const button = fixture.nativeElement.querySelector('#input-btn');

    // WHEN
    button.click();

    // THEN
    expect(component.items().length).toEqual(2);
  });

  it('should highlight text', () => {
    // GIVEN
    const find = fixture.nativeElement.querySelector('#find');

    const listitem =
      fixture.nativeElement.querySelectorAll('.list-item-text')[0];
    const hightlight = listitem.querySelector('.highlighted-text');
    expect(hightlight).toBeNull();
    fixture.detectChanges();

    // WHEN
    find.value = 'te';
    find.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // THEN
    expect(listitem.querySelector('.highlighted-text')).not.toBeNull();
    expect(listitem.innerHTML).toContain(
      '<span class="highlighted-text">te</span>'
    );
    expect(component.highlightedText()).toEqual('te');
    expect(true).toBeTruthy();
  });
});
