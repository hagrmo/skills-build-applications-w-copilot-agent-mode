import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user', '-password');
  res.json(activities);
});

router.post('/', async (req: Request, res: Response) => {
  const activity = new Activity(req.body as object);
  await activity.save();
  res.status(201).json(activity);
});

router.get('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params['id']).populate('user', '-password');
  if (!activity) { res.status(404).json({ error: 'Activity not found' }); return; }
  res.json(activity);
});

router.put('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findByIdAndUpdate(req.params['id'], req.body as object, { new: true });
  if (!activity) { res.status(404).json({ error: 'Activity not found' }); return; }
  res.json(activity);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Activity.findByIdAndDelete(req.params['id']);
  res.status(204).end();
});

export default router;
