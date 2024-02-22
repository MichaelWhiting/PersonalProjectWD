import { Sequelize } from "sequelize";
import { User, Score, Game } from "../database/model.js";
import { format } from "morgan";

const handlerFunctions = {
    getAllGames: async (req, res) => {
        const games = await Game.findAll()
        
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
            console.log("Inccorect credentials");
            return;
        }
        
        console.log(`${user.username} has logged in!`);

        res.send({
            message: "User is logged in",
            user
        });
    },
    createUser: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) { 
            console.log("stuff is empty");
            return;
        }

        const userExists = await (User.findOne({
            where: {
                username: username
            }
        }))
    
        if (userExists !== null) {
            console.log("user already exists!")
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
    }
}

export default handlerFunctions;