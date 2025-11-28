import { signal } from '@angular/core';
import { of } from 'rxjs';
import * as items from '../../../mocks/list.mock.json';
import { ListItem } from './data.interface';

export class DataServiceMock {
  items = signal<ListItem[]>(items.items);
  highlightedText = signal<string>('');
  getListItems = jest.fn();
  addListItem = jest.fn().mockImplementation((v) => {
    this.items.update((values: ListItem[]) => {
      return [...values, v];
    });
  });
  getListItem = jest.fn().mockImplementation((name) => {
    if (name === 'item-1') {
      return of(this.items()[0]);
    }
    return of(null);
  });
}
