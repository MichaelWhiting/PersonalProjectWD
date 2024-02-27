import { User, Score, Game } from "../database/model.js";

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
                gameName: gameName,
            },
            limit: 10
        });

        res.send({
            message: "Retrieved all scores from table",
            scores
        })
    },

    getUserFromScore: async (req, res) => {
        console.log(req.session)
        const { userId } = req.params;

        const user = await User.findOne({
            where: {
                userId: userId
            }
        })

        res.send({
            message: "Retrieved user from score",
            user
        })
    },

    getScoresFromUser: async (req, res) => {
        const { userId } = req.params;

        const scores = await Score.findAll({
            where: {
                userId: userId
            }
        })

        res.send({
            message: "Retrieved scores from userId",
            scores
        });
    },

    sessionCheck: async (req, res) => {
        if (req.session.userId) {
            res.send({
                message: "userId exists on the session",
                success: true,
                userId: req.session.userId
            });
            return;
        } else {
            res.send({
                message: "userId does NOT exist on the session",
                success: false
            });
            return;
        }
    },

    loginUser: async (req, res) => {
        const { username, password } = req.body;
        const formattedUsername = username.toLowerCase();

        const user = await User.findOne({ where: { username: formattedUsername }});

        if (!user) {
            res.send({
                message: "User with username does NOT exist",
                success: false
            });
            return;
        }

        if (user.password !== password) {
            res.send({
                message: "Password is incorrect",
                success: false
            });
            return;
        }

        // if it made it past those 2 if statements, it means that the credentials are correct
        req.session.userId = user.userId;
        console.log(req.session)
        res.send({
            message: "Successfully set the sessions userId",
            success: true,
            userId: req.session.userId
        })
        return
    },

    logoutUser: async (req, res) => {
        req.session.destroy();

        res.send({
            message: "Destroyed the session's contents",
            success: true
        });
        return;
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
        }));

        if (userExists !== null) {
            console.log("User already exists!")
            return;
        }

        const formattedUsername = username.toLowerCase();

        const newUser = await User.create({
            username: formattedUsername,
            password
        });

        res.send({
            message: "Created new user",
            newUser
        });
    },

    getUserFromId: async (req, res) => {
        const { userId } = req.params;

        const user = await User.findByPk(userId);

        if (user) {
            res.send({
                message: "Got user object",
                user
            })
        } else {
            console.log(`User not found with id of ${userId}`);
        }
    },

    updateUsername: async (req, res) => {
        const { username } = req.body;

        const user = await User.update(
            { username },
            { where: {
                userId: 0 // change this ti the req.session one later
            }}
        )

        res.send({
            message: "Updated username",
            success: true,
            user
        })
    }
}

export default handlerFunctions;