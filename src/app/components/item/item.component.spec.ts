import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { DataServiceMock } from '../../services/data/data.service.mock';
import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ name: 'item-1' }) },
        },
        {
          provide: DataService,
          useClass: DataServiceMock,
        },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.itemDetails()).toEqual({
      name: 'item-1',
      value: 'Item 1',
    });
  });

  it('should return to the list page if item doesnt exits', () => {
    // GIVEN
    const spy = jest.spyOn((component as any).router, 'navigate');

    // WHEN
    (component as any).getItemDetails('some-detail-name');

    // THEN
    expect(spy).toHaveBeenCalledWith(['/list']);
  });
});
