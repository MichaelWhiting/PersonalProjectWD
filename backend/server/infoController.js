import { Sequelize } from "sequelize";
import { User, Score, Game } from "../database/model.js";
import OpenAI from "openai";

const infoHandler = {
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

        const user = await User.findOne({ where: { username: formattedUsername } }); // finds the user object with that username

        if (!user) { // if user === null, then it means there is no user that exists with that username
            res.send({
                message: "Account with username does not exist",
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
            res.send({
                message: "One of the fields are empty",
                success: false
            });
            return;
        }

        const userExists = await (User.findOne({ // checks if a user already exists with that username
            where: {
                username: username
            }
        }));

        if (userExists !== null) { // will return if it does find a user with that username already
            res.send({
                message: "User with username already exists",
                success: false
            });
            return;
        }

        const formattedUsername = username.toLowerCase(); // formats it to save it to the database

        const newUser = await User.create({ // creates the new user object
            username: formattedUsername,
            password
        });

        res.send({ // sends back the newly created user object.
            message: "Created new user",
            success: true,
            newUser
        });
    },

    updateUsername: async (req, res) => {
        const { username } = req.body;

        const userWithName = await User.findOne({
            where: {
                username: username
            }
        });

        if (userWithName) { // checks if the username is already taken by someone else
            res.send({
                message: "Username taken",
                success: false
            });
            return;
        }

        if (username === "") { // makes sure username isn't empty
            res.send({
                message: "Username cannot be blank",
                success: false
            });
            return;
        }

        const user = await User.update( // finds the user with logged in userId and updates their username.
            { username },
            { where: {
                userId: req.session.userId // change this ti the req.session one later
            }
        });

        res.send({ // sends back the newly updated user object.
            message: "Updated username",
            success: true,
            user
        });
    },

    deleteUser: async (req, res) => {
        const { userId } = req.params;

        if (+userId === req.session.userId) { // means the user is trying to delete their own account
            const userToDestroy = await User.findByPk(userId);
            await userToDestroy.destroy();

            res.send({
                message: "Destroyed user",
                success: true
            });
        } else { // means that someone is attempting to delete an account that isn't the same as theirs.
            res.send({
                message: "Didn't destroy user, userId isn't same as req.session.userId",
                success: false
            });
        }
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
            order: [['score', 'DESC']],
            limit: 25,
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
    },

    askGPT: async (req, res) => {
        const { category } = req.params;
        const API_KEY = "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";
        const openai = new OpenAI({ apiKey: API_KEY }); // creates an instance of the openai API

        // this is the prompt that we pass to the GPT API that tells it the format and what to respond with
        const question = `
        Create a list of the top 75 most popular ${category}. Make all of the strings lowercase and remove any - and replace it with a space. 
        Keep spaces if they are already there. Make 100% sure that every string item in the array is fully lowercased. 
        Make sure that everything in the array is NOT plural, make them singular. Make sure that everything in the array is NOT plural, make them singular. 
        Do not repeat things in the array.
        Do not include any explanations or backticks around the response, only provide a RFC8259 compliant JSON response following this format without deviation.
        {
            'CategoryName': ['item1', 'item2', item3']
        }
         The JSON response:
        `

        openai.chat.completions.create({ // here it sends a request to the API
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: question }]
        }).then((response) => {
            const message = response.choices[0].message.content; // this is the response that the API gives back
            console.log(response.choices[0].message);
            const gameInfo = JSON.parse(message); // parses response into a javascript object

            res.send({
                message: "Got GPT answer",
                parsedRes: gameInfo
            })
        });
    }
}

export default infoHandler;