import { Routes } from '@angular/router';
import { Albums } from './albums';
import { Photos } from './photos/photos';

export const ALBUMS_ROUTES: Routes = [
  {
    path: '',
    component: Albums,
  },
  {
    path: ':id',
    component: Photos,
  },
];
