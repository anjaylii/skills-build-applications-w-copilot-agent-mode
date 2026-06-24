import express from 'express';
import type { Request, Response } from 'express';
import Activity from '../models/activity.ts';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const items = await Activity.find().populate('user').lean();
  res.json(items);
});

router.post('/', async (req: Request, res: Response) => {
  const created = await Activity.create(req.body);
  res.status(201).json(created);
});

router.get('/:id', async (req: Request, res: Response) => {
  const item = await Activity.findById(req.params.id).populate('user').lean();
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.put('/:id', async (req: Request, res: Response) => {
  const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
