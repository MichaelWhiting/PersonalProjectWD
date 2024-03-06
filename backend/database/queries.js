import OpenAI from "openai";

// import { User, Score, Game } from './model.js';

// Some queries to test some things:

// 1. Getting all of the scores for the Wordle Game
// const wordleScores = await Score.findAll({ 
//     where: {
//         gameName: "wordle"
//     }
// })

// console.log(wordleScores);
// const obj = {'marvel_heroes': ['spider man', 'iron man', 'captain america', 'thor', 'hulk', 'black widow', 'hawkeye', 'doctor strange', 'black panther', 'ant man', 'wasp', 'scarlet witch', 'vision', 'falcon', 'winter soldier', 'star lord', 'gamora', 'drax the destroyer', 'rocket raccoon', 'groot', 'loki', 'valkyrie', 'war machine', 'deadpool', 'cable', 'domino', 'colossus', 'negasonic teenage warhead', 'daredevil', 'jessica jones', 'luke cage', 'iron fist', 'punisher', 'elektra', 'nick fury', 'maria hill', 'phil coulson', 'mantis', 'nebula', 'yondu', 'okoye', 'shuri', 'wong', 'korg', 'miek', 'pepper potts', 'happy hogan', 'agent carter', 'howard stark', 'odin']}
// console.log(Object.keys(obj)[0]);
// console.log(obj[Object.keys(obj)[0]]);

const category = 'marvel heroes'

const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });

const question = `Generate me a string that would be able to be parsed into JavaScript. 
    Make the string itself be an object, where the key is the name of the category as a string,
    and the value is an array of values. Make the value an array of the top 50 most popular ${category}.
    Make all of the strings in the array lowercased, remove any - from them and replace it with a space. 
    Do not have any backticks in the response, I am looking for a string only response. Do not respond 
    trying to display as code, I only want a string. Here is an example of the response I'm looking 
    for: {'fruits': ['apple', 'banana']}. Do not put "" or '' around the outside of the response`

openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: question }]
}).then((res) => {
    console.log(res.choices[0].message.content[0])
    const message = res.choices[0].message.content;
    console.log(message);
})