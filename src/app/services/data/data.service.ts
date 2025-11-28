import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ListItem } from './data.interace';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http = inject(HttpClient);

  items = signal<ListItem[]>([]);
  highlightedText = signal<string>('');

  // retrieve all list items and update them to local signal state.
  getListItems() {
    this.http.get<ListItem[]>('/api/list').subscribe((items: ListItem[]) => {
      this.items.set(items);
    });
  }

  // retrieve single list item by name
  getListItem(name: string): Observable<ListItem> {
    return this.http.get<ListItem>(`/api/list/${name}`);
  }

  // add a new list item and update local signal state with the new item
  addListItem(item: ListItem): void {
    this.http.post<ListItem>('/api/list/add', item).subscribe((v) => {
      this.items.update((values: ListItem[]) => {
        return [...values, v];
      });
    });
  }
}
