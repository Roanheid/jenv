import { http, HttpResponse } from 'msw';
import * as list from './list.mock.json';

export const handlers = [
  http.get('/api/list', async () => {
    return HttpResponse.json(list.items, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
