import { User, Score, Game } from './model.js';

// Some queries to test some things:

// 1. Getting all of the scores for the Wordle Game
const wordleScores = await Score.findAll({ 
    where: {
        gameName: "wordle"
    }
})

console.log(wordleScores);