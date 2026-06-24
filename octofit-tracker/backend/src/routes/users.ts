import express from 'express';
import type { Request, Response } from 'express';
import User from '../models/user.ts';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await User.find().populate('team').lean();
  res.json(users);
});

router.post('/', async (req: Request, res: Response) => {
  const created = await User.create(req.body);
  res.status(201).json(created);
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate('team').lean();
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
});

router.put('/:id', async (req: Request, res: Response) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
