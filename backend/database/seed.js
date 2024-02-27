import { User, Score, Game } from './model.js';
import { db } from './model.js';

await db.sync({ force: true }); // I'm pretty sure this resets the database to nothing before seeding again.

// Create a user, will be used for testing:
const user1 = await User.create({ username: "mike123", password: "test" });
const user2 = await User.create({ username: "michael456", password: "test" });

// Create a game:
const game1 = await Game.create({ gameName: "Hangman", scoreIds: [1,2]})
const game2 = await Game.create({ gameName: "MazeGame", scoreIds: [3]})

// Create some scores:
const score1 = await Score.create({ gameName: "Hangman", score: 6, userId: 1})
const score2 = await Score.create({ gameName: "Hangman", score: 3, userId: 2})
const score3 = await Score.create({ gameName: "MazeGame", score: 2, userId: 2})
const score4 = await Score.create({ gameName: "MazeGame", score: 9, userId: 1})
const score5 = await Score.create({ gameName: "MazeGame", score: 3, userId: 2})
const score6 = await Score.create({ gameName: "Hangman", score: 7, userId: 1})
const score7 = await Score.create({ gameName: "MazeGame", score: 12, userId: 2})
const score8 = await Score.create({ gameName: "Hangman", score: 1, userId: 1})


for (let i = 1; i < 101; i++) {
    await Score.create({ gameName: "Hangman", score: Math.floor(Math.random() * 20), userId: 1});
}

await db.close()
console.log("Finished seeding the database!")