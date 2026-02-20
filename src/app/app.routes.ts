import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Todos } from './pages/todos/todos';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'posts',
    loadChildren: () => import('./pages/posts/posts.routes').then((m) => m.POSTS_ROUTES),
  },
  { path: 'todos', component: Todos },
  {
    path: 'albums',
    loadChildren: () => import('./pages/albums/albums.routes').then((m) => m.ALBUMS_ROUTES),
  },
];
