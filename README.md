# PersonalProjectWD Games Website

This project is a website that has a few different games. The games can be played while not being logged in, but it will not save those scores to the database if so. You are able to login and create accounts and are able to edit things like your username. If you are logged in and play a game, when the game ends it will attempt to save the score to the database and if it is one of the top 20 highest scores for that game, it will be displayed on the leaderboards page for that game. This project is mostly coded in React.

## Current Games:
- Hangman: Try to guess the word by guessing letters.
- Categories: Try to name off as many "things" from a category of your choice as you can within the time limit.
- Scramble: Try and unscramble the letters into a word.

## Dependencies used in this project:
- axios
- bootstrap
- bootstrap-icons
- express
- express-session
- morgan
- openai
- pg
- pg-hstore
- react
- react-bootstrap-icons
- react-dom
- react-redux
- react-router-dom
- react-spring
- sequelize
- vite-express
- framer-motion

## Instructions to run this project:
1. Clone repository to a directory on your computer
2. After opening the project, run this command in the terminal:
### **npm i**
3. After that, to start running server, run this command in the terminal:
### **npm run dev**