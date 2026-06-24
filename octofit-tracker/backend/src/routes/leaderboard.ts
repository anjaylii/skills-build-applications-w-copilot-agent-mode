import express from 'express';
import type { Request, Response } from 'express';
import Leaderboard from '../models/leaderboard.ts';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const board = await Leaderboard.find().populate('user').sort({ score: -1 }).lean();
  res.json(board);
});

export default router;
