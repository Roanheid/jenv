import { Routes } from '@angular/router';
import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  {
    path: 'list/:name',
    component: ItemComponent,
  },
  { path: '**', redirectTo: '' },
];
