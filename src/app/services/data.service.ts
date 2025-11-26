import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { ListItem } from './data.interace';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http = inject(HttpClient);

  getListItems(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>('/api/list');
  }
}
