"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Workout_1 = __importDefault(require("../models/Workout"));
async function seed() {
    await (0, database_1.connectDatabase)();
    // Clear existing data
    await Promise.all([
        User_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        Activity_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
    ]);
    // Seed users
    const users = await User_1.default.insertMany([
        { username: 'octocat', email: 'octocat@github.com', password: 'password123' },
        { username: 'mona', email: 'mona@github.com', password: 'password123' },
        { username: 'hubot', email: 'hubot@github.com', password: 'password123' },
    ]);
    // Seed teams
    const team = await Team_1.default.create({
        name: 'OctoFit Team',
        members: users.map(u => u._id),
    });
    console.log(`Created team: ${team.name}`);
    // Seed activities
    await Activity_1.default.insertMany([
        { user: users[0]?._id, activityType: 'Running', duration: 30 },
        { user: users[1]?._id, activityType: 'Cycling', duration: 45 },
        { user: users[2]?._id, activityType: 'Swimming', duration: 60 },
    ]);
    // Seed leaderboard
    await Leaderboard_1.default.insertMany([
        { user: users[0]?._id, score: 300 },
        { user: users[1]?._id, score: 450 },
        { user: users[2]?._id, score: 600 },
    ]);
    // Seed workouts
    await Workout_1.default.insertMany([
        { name: 'Morning Run', description: 'Easy 5k run', exercises: ['Warm up', 'Run 5k', 'Cool down'], duration: 30 },
        { name: 'Strength Training', description: 'Full body workout', exercises: ['Push-ups', 'Squats', 'Planks'], duration: 45 },
        { name: 'HIIT Session', description: 'High intensity interval training', exercises: ['Burpees', 'Jump squats', 'Mountain climbers'], duration: 20 },
    ]);
    console.log('Database seeded successfully!');
    await (0, database_1.disconnectDatabase)();
}
seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map