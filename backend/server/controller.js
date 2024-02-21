import { Sequelize } from "sequelize";
import { User, Score, Game } from "../database/model.js";

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

        // const scores = [];

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
    }
}

export default handlerFunctions;