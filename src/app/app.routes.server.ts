import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'posts/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'albums/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'todos',
    renderMode: RenderMode.Client,
  },
  {
    path: 'albums',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
