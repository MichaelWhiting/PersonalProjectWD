import ViteExpress from "vite-express";
import session from "express-session";
import express from "express";
import morgan from "morgan";

import infoHandler from "./infoController.js";
import gameHandler from "./gamesController.js";

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

// Routes
// GET
app.get("/leaderboards/games", infoHandler.getAllGames);
app.get("/leaderboard/:gameName", infoHandler.getScoresForGame);
app.get("/score/:userId", infoHandler.getUserFromScore);
app.get("/scores/:userId", infoHandler.getScoresFromUser);
app.get("/getUser/:userId", infoHandler.getUserFromId);
app.get("/session-check", infoHandler.sessionCheck);
app.get("/logout", infoHandler.logoutUser);

// POST
// Info POSTS
app.post("/createUser", infoHandler.createUser);
app.post("/login", infoHandler.loginUser);

// Game POSTS
app.post("/saveScore", gameHandler.saveScore);

// PUT
app.put("/updateUsername", infoHandler.updateUsername);

// DELETE
app.delete("/deleteUser/:userId", infoHandler.deleteUser)

// Server Startup
const port = 9989;
ViteExpress.listen(app, port, () => console.log(`Server started up at: http://localhost:${port}`));