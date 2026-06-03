import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const entries = await Leaderboard.find().populate('user', '-password').sort({ score: -1 });
  res.json(entries);
});

router.post('/', async (req: Request, res: Response) => {
  const entry = new Leaderboard(req.body as object);
  await entry.save();
  res.status(201).json(entry);
});

router.put('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findByIdAndUpdate(req.params['id'], req.body as object, { new: true });
  if (!entry) { res.status(404).json({ error: 'Entry not found' }); return; }
  res.json(entry);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Leaderboard.findByIdAndDelete(req.params['id']);
  res.status(204).end();
});

export default router;
