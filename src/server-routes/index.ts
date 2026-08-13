import { Router } from 'express';

import { postsRouter } from './posts.routes';
import { usersRouter } from './users.routes';
import { albumsRouter } from './albums.routes';
import { todosRouter } from './todos.routes';
import { commentsRouter } from './comments.routes';

export const apiRouter = Router();

apiRouter.use(postsRouter);
apiRouter.use(usersRouter);
apiRouter.use(todosRouter);
apiRouter.use(albumsRouter);
apiRouter.use(commentsRouter);
