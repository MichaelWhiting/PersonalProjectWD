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

        console.log(scores)

        // const scores = [];

        res.send({
            message: "Retieved all scores from table",
            scores
        })
    }
}

export default handlerFunctions;