import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import * as items from '../../mocks/list.mock.json';
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
    service.getListItems().subscribe((items) => {
      // THEN
      expect(items).toEqual(mockItems);
    });

    const req = httpMock.expectOne('/api/list');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });
});
