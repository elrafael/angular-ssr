import { Routes } from '@angular/router';
import { Posts } from './posts';
import { PostDetail } from './post-detail/post-detail';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    component: Posts,
  },
  {
    path: ':id',
    component: PostDetail,
  },
];
