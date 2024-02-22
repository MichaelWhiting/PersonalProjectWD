import express from "express";
import morgan from "morgan";
import session from "express-session";
import ViteExpress from "vite-express";

import handlerFunctions from "./controller.js";

// Create express instance
const app = express();

// axios is Frontend ONLY, express is the server one.

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secretKey",
    saveUninitialized: false,
    resave: false,
  })
);

export function checkIfLoggedIn(req) {
  return req.session.userId;
}

// Routes

// GET
app.get("/leaderboards/games", handlerFunctions.getAllGames);
app.get("/leaderboard/:gameName", handlerFunctions.getScoresForGame);
app.get("score/:userid", handlerFunctions.getUserFromScore);

// POST



// Start up server
const port = 9999;
ViteExpress.listen(app, port, () => console.log(`Server started up at: http://localhost:${port}`));