import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import * as items from '../../../mocks/list.mock.json';
import { ListItem } from './data.interace';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET list items', () => {
    // GIVEN
    const mockItems: ListItem[] = items.items;

    // WHEN
    service.getListItems();

    // THEN
    const req = httpMock.expectOne('/api/list');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
    expect(service.items()).toEqual(mockItems);
  });

  it('should GET list item', () => {
    // GIVEN
    const mockItem: ListItem = items.items[0];

    // WHEN
    service.getListItem('item-1').subscribe((item) => {
      expect(item).toEqual(mockItem);
    });

    // THEN
    const req = httpMock.expectOne('/api/list/item-1');
    expect(req.request.method).toBe('GET');
    req.flush(mockItem);
  });

  it('should ADD list item', () => {
    // GIVEN
    const mockItems: ListItem[] = items.items;
    const mockItem: ListItem = { name: 'item-3', value: 'Item 3' };
    service.items.set(mockItems);

    // WHEN
    service.addListItem(mockItem);

    // THEN
    const req = httpMock.expectOne('/api/list/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockItem);
    req.flush(mockItem);
    expect(service.items()).toEqual([...mockItems, mockItem]);
  });
});
