import { User, Score, Game } from './model.js';
import { db } from './model.js';

await db.sync({ force: true }); // I'm pretty sure this resets the database to nothing before seeding again.

// Create a user, will be used for testing:
const user1 = await User.create({ username: "mike123", password: "test" });
const user2 = await User.create({ username: "michael456", password: "test" });

// Create a game:
const game1 = await Game.create({ gameName: "Hangman", scoreIds: [1,2]})
const game2 = await Game.create({ gameName: "Categories", scoreIds: [3]})
// const game3 = await Game.create({ gameName: "Game 3", scoreIds: [3]})
// const game4 = await Game.create({ gameName: "Game 4", scoreIds: [3]})

// Create some scores:

// for (let i = 1; i < 5; i++) {
//     await Score.create({ gameName: "Hangman", score: Math.floor(Math.random() * 20), userId: 1});
//     await Score.create({ gameName: "Categories", score: Math.floor(Math.random() * 20), userId: 1});
//     await Score.create({ gameName: "Hangman", score: Math.floor(Math.random() * 20), userId: 2});
//     await Score.create({ gameName: "Categories", score: Math.floor(Math.random() * 20), userId: 2});
// }

await db.close()
console.log("Finished seeding the database!")

// INSERT INTO games (game_name, score_ids) VALUES ('Scramble', ARRAY[4,5]); SQL for adding game
// INSERT INTO games (game_name, score_ids) VALUES ('Game4', ARRAY[6,7]);
// DELETE FROM games WHERE game_name = 'Game4';