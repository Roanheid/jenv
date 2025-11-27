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

  getListItems() {
    this.http.get<ListItem[]>('/api/list').subscribe((items: ListItem[]) => {
      this.items.set(items);
    });
  }

  getListItem(name: string): Observable<ListItem> {
    return this.http.get<ListItem>(`/api/list/${name}`);
  }

  addListItem(item: ListItem): void {
    this.http.post<ListItem>('/api/list/add', item).subscribe((v) => {
      this.items.update((values: ListItem[]) => {
        return [...values, v];
      });
    });
  }
}
