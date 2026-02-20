import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { Todo } from './app/shared/interfaces/todo';
import { User } from './app/shared/interfaces/user';
import { Album } from './app/shared/interfaces/album';
import { Photo } from './app/shared/interfaces/photo';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

app.get('/api/posts', async (req, res) => {
  try {
    const limit = req.query['limit'] || 10;
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=' + limit);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});
app.get('/api/posts/:id', async (req, res) => {
  try {
    const id = req.params['id'];
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});
app.get('/api/users/:id', async (req, res) => {
  try {
    const id = req.params['id'];
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});
app.get('/api/posts/:id/comments', async (req, res) => {
  try {
    const id = req.params['id'];
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});
app.get('/api/todos', async (req, res) => {
  try {
    const [todosRes, usersRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos'),
      fetch('https://jsonplaceholder.typicode.com/users'),
    ]);

    const todos: Todo[] = await todosRes.json();
    const users: User[] = await usersRes.json();

    const enrichedTodos = todos.map((todo) => {
      const user = users.find((u) => u.id === todo.userId);
      return {
        ...todo,
        userName: user ? user.name : 'Unknown',
      };
    });

    res.status(200).json(enrichedTodos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.get('/api/albums', async (req, res) => {
  try {
    // 1. Vai buscar apenas a lista de álbuns primeiro
    const albumsRes = await fetch('https://jsonplaceholder.typicode.com/albums?_limit=12');
    const albums: Album[] = await albumsRes.json();

    // 2. Para cada álbum, dispara um pedido para obter APENAS as fotos desse álbum
    // O Promise.all garante que estes pedidos corram em paralelo
    const enrichedAlbums = await Promise.all(
      albums.map(async (album) => {
        const photosRes = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`,
        );
        const photos: Photo[] = await photosRes.json();

        return {
          ...album,
          totalPhotos: photos.length,
          coverUrl: `https://picsum.photos/seed/${album.id}/600/600`,
        };
      }),
    );

    res.status(200).json(enrichedAlbums);
  } catch (error) {
    console.error('Error fetching enriched albums:', error);
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
});
app.get('/api/albums/:id/photos', async (req, res) => {
  try {
    const id = req.params['id'];
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
    const data = await response.json();

    res.status(200).json(
      data.map((photo: Photo) => ({
        ...photo,
        url: `https://picsum.photos/seed/${photo.id}/600/600`,
      })),
    );
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
