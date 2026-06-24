/**
 * Seed the octofit_db database with test data
 *
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import User from '../models/user.ts';
import Team from '../models/team.ts';
import Activity from '../models/activity.ts';
import Workout from '../models/workout.ts';
import Leaderboard from '../models/leaderboard.ts';

const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ]);

  // Create teams
  const teamA = await Team.create({ name: 'Octo Runners' });
  const teamB = await Team.create({ name: 'Deep Sea Sprinters' });

  // Create users
  const users = await User.create([
    { name: 'Ava Carter', email: 'ava.carter@example.com', team: teamA._id },
    { name: 'Liam Nguyen', email: 'liam.nguyen@example.com', team: teamA._id },
    { name: 'Maya Patel', email: 'maya.patel@example.com', team: teamB._id },
    { name: 'Noah Smith', email: 'noah.smith@example.com', team: teamB._id }
  ]);

  // Attach members to teams
  teamA.members = [users[0]._id, users[1]._id];
  teamB.members = [users[2]._id, users[3]._id];
  await teamA.save();
  await teamB.save();

  // Create workouts
  const workouts = await Workout.create([
    {
      name: 'Full Body Blast',
      description: 'A quick HIIT full body workout',
      exercises: [
        { name: 'Burpees', reps: 12, sets: 3 },
        { name: 'Push-ups', reps: 15, sets: 3 }
      ],
      durationMinutes: 30,
      difficulty: 'hard'
    },
    {
      name: 'Morning Jog',
      description: 'Easy morning cardio session',
      exercises: [{ name: 'Jogging', reps: 0, sets: 0 }],
      durationMinutes: 25,
      difficulty: 'easy'
    }
  ]);

  // Create activities
  const activities = [];
  activities.push(
    await Activity.create({ user: users[0]._id, type: 'run', durationMinutes: 35, calories: 320, date: new Date() })
  );
  activities.push(
    await Activity.create({ user: users[1]._id, type: 'cycle', durationMinutes: 45, calories: 540, date: new Date() })
  );
  activities.push(
    await Activity.create({ user: users[2]._id, type: 'swim', durationMinutes: 30, calories: 300, date: new Date() })
  );
  activities.push(
    await Activity.create({ user: users[3]._id, type: 'yoga', durationMinutes: 40, calories: 180, date: new Date() })
  );

  // Create leaderboard entries (sample scores)
  await Leaderboard.create([
    { user: users[1]._id, score: 1580, rank: 1 },
    { user: users[0]._id, score: 1420, rank: 2 },
    { user: users[2]._id, score: 1210, rank: 3 },
    { user: users[3]._id, score: 980, rank: 4 }
  ]);

  console.log('Seeding complete:');
  console.log(`  users=${await User.countDocuments()}`);
  console.log(`  teams=${await Team.countDocuments()}`);
  console.log(`  workouts=${await Workout.countDocuments()}`);
  console.log(`  activities=${await Activity.countDocuments()}`);
  console.log(`  leaderboard=${await Leaderboard.countDocuments()}`);

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed error', err);
  process.exit(1);
});
