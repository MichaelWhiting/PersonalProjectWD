import { User, Score, Game } from './model.js';
import { db } from './model.js';

await db.sync({ force: true }); // I'm pretty sure this resets the database to nothing before seeding again.

// Create a user, will be used for testing:
const user1 = await User.create({ userId: 0, username: "mike123", password: "test" });
const user2 = await User.create({ userId: 1, username: "michael456", password: "test" });

// Create a game:
const game1 = await Game.create({ gameName: "wordle", scoreIds: [1,2]})
const game2 = await Game.create({ gameName: "mazeGame", scoreIds: [3]})

// Create some scores:
const score1 = await Score.create({ scoreId: 0, gameName: "wordle", score: 6, userId: 0})
const score2 = await Score.create({ scoreId: 1, gameName: "wordle", score: 3, userId: 1})
const score3 = await Score.create({ scoreId: 2, gameName: "mazeGame", score: 3, userId: 1})

await db.close()
console.log("Finished seeding the database!")