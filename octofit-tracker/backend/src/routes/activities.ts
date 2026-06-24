import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'List activities (placeholder)' });
});

router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create activity (placeholder)', data: req.body });
});

router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Get activity (placeholder)', id: req.params.id });
});

router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Update activity (placeholder)', id: req.params.id, data: req.body });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.status(204).send();
});

export default router;
