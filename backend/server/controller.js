import { Sequelize } from "sequelize";
import { User, Score, Game } from "../database/model.js";
import { useNavigate } from "react-router-dom";

export const checkIfLoggedIn = (req) => {
    return req.session.user === null;
}

const handlerFunctions = {
    getAllGames: async (req, res) => {
        const games = await Game.findAll();

        res.send({
            message: "Retreived games from table",
            games
        })
    },

    getScoresForGame: async (req, res) => {
        const { gameName } = req.params;
        const scores = await Score.findAll({
            where: {
                gameName: gameName
            }
        });

        res.send({
            message: "Retrieved all scores from table",
            scores
        })
    },

    getUserFromScore: async (req, res) => {
        const { userId } = body.params;

        const user = User.findAll({
            where: {
                userId: userId
            }
        })

        res.send({
            message: "Retrieved user from score",
            user
        })
    },

    loginUser: async (req, res) => {
        const { username, password } = req.body;

        const formattedUsername = username.toLowerCase(); // makes it lowercase to look in DB

        const user = await User.findOne({
            where: {
                username: formattedUsername,
                password: password
            }
        });

        if (user === null) { // if user is null it means that it didnt find a user object with that same username and pass
            console.log("Incorrect credentials");
            return;
        } else { // means it found the user and we can now log them in.
            req.session.user = user;
            console.log("session user is now: ", req.session.user);
            res.send({
                message: "User is logged in",
            });
        }
    },

    createUser: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            console.log("One of the fields are empty");
            return;
        }

        const userExists = await (User.findOne({
            where: {
                username: username
            }
        }))

        if (userExists !== null) {
            console.log("User already exists!")
            return;
        }

        const formattedUsername = username.toLowerCase();

        const newUser = await User.create({
            username: formattedUsername,
            password
        })

        res.send({
            message: "Created new user",
            newUser
        })
    },

    checkLoggedIn: async (req, res) => {
        console.log(req.session.user);  

        if (req.session.user === null) {
            return;
        }
        res.send({
            message: "Just checked if user was logged in"
        })
    },

    getUser: async (req, res) => {
        if (req.session.user !== null) {
            res.send({
                message: "Retrieved logged in user",
                user: req.session.user
            })
        } else {
            console.log("No one logged in");
        }
    }
}

export default handlerFunctions;