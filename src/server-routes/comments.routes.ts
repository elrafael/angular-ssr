import { Router } from 'express';

export const commentsRouter = Router();
commentsRouter.post('/api/comments', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error submitting comment:', error);
    res.status(500).json({ error: 'Failed to submit comment' });
  }
});
