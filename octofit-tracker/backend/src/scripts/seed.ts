/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

async function seed(): Promise<void> {
  await connectDatabase();

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  // Seed users
  const users = await User.insertMany([
    { username: 'octocat', email: 'octocat@github.com', password: 'password123' },
    { username: 'mona', email: 'mona@github.com', password: 'password123' },
    { username: 'hubot', email: 'hubot@github.com', password: 'password123' },
  ]);

  // Seed teams
  const team = await Team.create({
    name: 'OctoFit Team',
    members: users.map(u => u._id as mongoose.Types.ObjectId),
  });

  console.log(`Created team: ${team.name}`);

  // Seed activities
  await Activity.insertMany([
    { user: users[0]?._id, activityType: 'Running', duration: 30 },
    { user: users[1]?._id, activityType: 'Cycling', duration: 45 },
    { user: users[2]?._id, activityType: 'Swimming', duration: 60 },
  ]);

  // Seed leaderboard
  await Leaderboard.insertMany([
    { user: users[0]?._id, score: 300 },
    { user: users[1]?._id, score: 450 },
    { user: users[2]?._id, score: 600 },
  ]);

  // Seed workouts
  await Workout.insertMany([
    { name: 'Morning Run', description: 'Easy 5k run', exercises: ['Warm up', 'Run 5k', 'Cool down'], duration: 30 },
    { name: 'Strength Training', description: 'Full body workout', exercises: ['Push-ups', 'Squats', 'Planks'], duration: 45 },
    { name: 'HIIT Session', description: 'High intensity interval training', exercises: ['Burpees', 'Jump squats', 'Mountain climbers'], duration: 20 },
  ]);

  console.log('Database seeded successfully!');
  await disconnectDatabase();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
