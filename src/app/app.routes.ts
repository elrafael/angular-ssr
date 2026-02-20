import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Todos } from './pages/todos/todos';
import { Albums } from './pages/albums/albums';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'posts',
    loadChildren: () => import('./pages/posts/posts.routes').then((m) => m.POSTS_ROUTES),
  },
  { path: 'todos', component: Todos },
  { path: 'albums', component: Albums },
];
