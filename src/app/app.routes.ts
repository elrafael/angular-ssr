import { Routes } from '@angular/router';
import { Posts } from './pages/posts/posts';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'posts', component: Posts },
];
