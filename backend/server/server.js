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

// Routes
// app.get("/", handlerFunctions.loadHomePage);



const port = 8888
ViteExpress.listen(app, port, () => console.log(`Server started up at: http://localhost:${port}`));