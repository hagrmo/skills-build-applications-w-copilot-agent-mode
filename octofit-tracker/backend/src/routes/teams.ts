import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members', '-password');
  res.json(teams);
});

router.post('/', async (req: Request, res: Response) => {
  const team = new Team(req.body as object);
  await team.save();
  res.status(201).json(team);
});

router.get('/:id', async (req: Request, res: Response) => {
  const team = await Team.findById(req.params['id']).populate('members', '-password');
  if (!team) { res.status(404).json({ error: 'Team not found' }); return; }
  res.json(team);
});

router.put('/:id', async (req: Request, res: Response) => {
  const team = await Team.findByIdAndUpdate(req.params['id'], req.body as object, { new: true });
  if (!team) { res.status(404).json({ error: 'Team not found' }); return; }
  res.json(team);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Team.findByIdAndDelete(req.params['id']);
  res.status(204).end();
});

export default router;
