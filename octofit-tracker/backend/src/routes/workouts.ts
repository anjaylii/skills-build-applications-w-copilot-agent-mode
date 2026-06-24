import express from 'express';
import type { Request, Response } from 'express';
import Workout from '../models/workout.ts';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const items = await Workout.find().lean();
  res.json(items);
});

router.post('/', async (req: Request, res: Response) => {
  const created = await Workout.create(req.body);
  res.status(201).json(created);
});

router.get('/:id', async (req: Request, res: Response) => {
  const item = await Workout.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.put('/:id', async (req: Request, res: Response) => {
  const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
