import { User, Score, Game } from "../database/model.js";

const handlerFunctions = {
    // User Handler Functions
    sessionCheck: async (req, res) => {
        if (req.session.userId) { // if the user is logged in, this sets the redux store userId var to be the same as the session
            res.send({
                message: "userId exists on the session",
                success: true,
                userId: req.session.userId
            });
            return;
        } else {
            res.send({
                message: "userId does NOT exist on the session", // means no one is logged in, so redirect to login page
                success: false
            });
            return;
        }
    },

    loginUser: async (req, res) => {
        const { username, password } = req.body;
        const formattedUsername = username.toLowerCase(); // makes it lowercase so it doesn't matter how user enters it

        const user = await User.findOne({ where: { username: formattedUsername }}); // finds the user object with that username

        if (!user) { // if user === null, then it means there is no user that exists with that username
            res.send({
                message: "User with username does NOT exist",
                success: false
            });
            return;
        }

        if (user.password !== password) { // if this runs it means the password the user entered for that username is incorrect
            res.send({
                message: "Password is incorrect",
                success: false
            });
            return;
        }

        // if it made it past those 2 if statements, it means that the credentials are correct
        req.session.userId = user.userId; // sets the session userId to be the id of that user object, this keeps them logged in

        res.send({
            message: "Successfully set the sessions userId",
            success: true,
            userId: req.session.userId
        });
        return;
    },

    logoutUser: async (req, res) => {
        req.session.destroy(); // destroys the session making it so the user is no longer logged in.

        res.send({
            message: "Destroyed the session's contents",
            success: true
        });

        return;
    },

    createUser: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) { // makes sure both of the text fields have a value
            console.log("One of the fields are empty");
            return;
        }

        const userExists = await (User.findOne({ // checks if a user already exists with that username
            where: {
                username: username
            }
        }));

        if (userExists !== null) { // will return if it does find a user with that username already
            console.log("User already exists!")
            return;
        }

        const formattedUsername = username.toLowerCase(); // formats it to save it to the database

        const newUser = await User.create({ // creates the new user object
            username: formattedUsername,
            password
        });

        res.send({ // sends back the newly created user object.
            message: "Created new user",
            newUser
        });
    },

    updateUsername: async (req, res) => {
        const { username } = req.body;

        const user = await User.update( // finds the user with logged in userId and updates their username.
            { username },
            { where: {
                userId: req.session.userId // change this ti the req.session one later
            }}
        );

        res.send({ // sends back the newly updated user object.
            message: "Updated username",
            success: true,
            user
        });
    },     
    
    getUserFromId: async (req, res) => {
        const { userId } = req.params;

        const user = await User.findByPk(userId);

        if (user) {
            res.send({
                message: "Got user object",
                user
            });
        } else {
            console.log(`User not found with id of ${userId}`);
        }
    },

    // Game Handler Functions
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
                gameName: gameName,
            },
            limit: 10
        });

        res.send({
            message: "Retrieved all scores from table",
            scores
        })
    },

    // Scores Handler Functions
    getUserFromScore: async (req, res) => {
        const { userId } = req.params;

        const user = await User.findOne({
            where: {
                userId: userId
            }
        });

        res.send({
            message: "Retrieved user from score",
            user
        });
    },

    getScoresFromUser: async (req, res) => {
        const { userId } = req.params;

        const scores = await Score.findAll({ // finds all of the scores of the user
            where: {
                userId: userId
            }
        })

        res.send({
            message: "Retrieved scores from userId",
            success: true,
            scores
        });
    }
}

export default handlerFunctions;