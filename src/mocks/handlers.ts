import { Params } from '@angular/router';
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
  http.get('/api/list/:name', async (params: Params) => {
    const name = params.params.name;
    const item = list.items.find((v) => v.name === name);
    return HttpResponse.json(item, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.post('/api/list/add', async ({ request }) => {
    const item = (await request.json()) as { name: string; value: string };
    list.items.push(item);
    return HttpResponse.json(item, { status: 201 });
  }),
];
