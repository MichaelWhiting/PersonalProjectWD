import { User, Score, Game } from './model.js';
import { db } from './model.js';

await db.sync({ force: true }); // I'm pretty sure this resets the database to nothing before seeding again.

// Create a user, will be used for testing:
const user1 = await User.create({ userId: 0, username: "mike123", password: "test" });
const user2 = await User.create({ userId: 1, username: "michael456", password: "test" });

// Create a game:
const game1 = await Game.create({ gameName: "Hangman", scoreIds: [1,2]})
const game2 = await Game.create({ gameName: "MazeGame", scoreIds: [3]})

// Create some scores:
const score1 = await Score.create({ scoreId: 0, gameName: "Hangman", score: 6, userId: 0})
const score2 = await Score.create({ scoreId: 1, gameName: "Hangman", score: 3, userId: 1})
const score3 = await Score.create({ scoreId: 2, gameName: "MazeGame", score: 2, userId: 1})
const score4 = await Score.create({ scoreId: 3, gameName: "MazeGame", score: 9, userId: 0})
const score5 = await Score.create({ scoreId: 4, gameName: "MazeGame", score: 3, userId: 1})
const score6 = await Score.create({ scoreId: 5, gameName: "Hangman", score: 7, userId: 0})
const score7 = await Score.create({ scoreId: 6, gameName: "MazeGame", score: 12, userId: 1})
const score8 = await Score.create({ scoreId: 7, gameName: "Hangman", score: 1, userId: 0})

await db.close()
console.log("Finished seeding the database!")