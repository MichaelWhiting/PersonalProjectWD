import ViteExpress from "vite-express";
import session from "express-session";
import express from "express";
import morgan from "morgan";

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

// Routes
// GET
app.get("/leaderboards/games", handlerFunctions.getAllGames);
app.get("/leaderboard/:gameName", handlerFunctions.getScoresForGame);
app.get("/score/:userId", handlerFunctions.getUserFromScore);
app.get("/scores/:userId", handlerFunctions.getScoresFromUser);
app.get("/getUser/:userId", handlerFunctions.getUserFromId);
app.get("/session-check", handlerFunctions.sessionCheck);
app.get("/logout", handlerFunctions.logoutUser);

// POST
app.post("/createUser", handlerFunctions.createUser);
app.post("/login", handlerFunctions.loginUser);

// PUT
app.put("/updateUsername", handlerFunctions.updateUsername);

// DELETE
app.delete("/deleteUser/:userId", handlerFunctions.deleteUser)

// Server Startup
const port = 9989;
ViteExpress.listen(app, port, () => console.log(`Server started up at: http://localhost:${port}`));