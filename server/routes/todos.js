import express from 'express';
import Todo from '../models/Todo.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

router.post('/', async (req, res) => {
  const todo = await Todo.create({ ...req.body, userId: req.user.id });
  res.status(201).json(todo);
});

router.put('/:id', async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Deleted' });
});

export default router;
