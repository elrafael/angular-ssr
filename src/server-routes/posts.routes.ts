import { Router } from 'express';

export const postsRouter = Router();

postsRouter.get('/api/posts', async (req, res) => {
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
postsRouter.get('/api/posts/:id', async (req, res) => {
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
postsRouter.get('/api/posts/:id/comments', async (req, res) => {
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
