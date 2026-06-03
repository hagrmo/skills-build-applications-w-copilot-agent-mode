import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.post('/', async (req: Request, res: Response) => {
  const user = new User(req.body as object);
  await user.save();
  res.status(201).json(user);
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params['id']).select('-password');
  if (!user) { res.status(404).json({ error: 'User not found' }); return; }
  res.json(user);
});

router.put('/:id', async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params['id'], req.body as object, { new: true }).select('-password');
  if (!user) { res.status(404).json({ error: 'User not found' }); return; }
  res.json(user);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params['id']);
  res.status(204).end();
});

export default router;
