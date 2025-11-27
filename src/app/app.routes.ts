import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ItemComponent } from './components/item/item.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  {
    path: 'detail/:name',
    component: ItemComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/list' },
];
