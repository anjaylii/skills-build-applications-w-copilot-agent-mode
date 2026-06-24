import express from 'express';
import type { Request, Response } from 'express';
import Team from '../models/team.ts';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const teams = await Team.find().populate('members').lean();
  res.json(teams);
});

router.post('/', async (req: Request, res: Response) => {
  const created = await Team.create(req.body);
  res.status(201).json(created);
});

router.get('/:id', async (req: Request, res: Response) => {
  const team = await Team.findById(req.params.id).populate('members').lean();
  if (!team) return res.status(404).json({ message: 'Not found' });
  res.json(team);
});

router.put('/:id', async (req: Request, res: Response) => {
  const updated = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Team.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
