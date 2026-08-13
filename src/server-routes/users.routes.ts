import { Router } from 'express';

export const usersRouter = Router();

usersRouter.get('/api/users/:id', async (req, res) => {
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
usersRouter.get('/api/users', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
