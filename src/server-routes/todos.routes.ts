import { Router } from 'express';
import { Todo } from '../app/shared/interfaces/todo';
import { User } from '../app/shared/interfaces/user';

export const todosRouter = Router();
todosRouter.get('/api/todos', async (req, res) => {
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
