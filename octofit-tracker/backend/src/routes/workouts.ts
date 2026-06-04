import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/', async (req: Request, res: Response) => {
  const workout = new Workout(req.body as object);
  await workout.save();
  res.status(201).json(workout);
});

router.get('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params['id']);
  if (!workout) { res.status(404).json({ error: 'Workout not found' }); return; }
  res.json(workout);
});

router.put('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findByIdAndUpdate(req.params['id'], req.body as object, { new: true });
  if (!workout) { res.status(404).json({ error: 'Workout not found' }); return; }
  res.json(workout);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await Workout.findByIdAndDelete(req.params['id']);
  res.status(204).end();
});

export default router;
