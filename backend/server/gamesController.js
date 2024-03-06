import { User, Score, Game } from "../database/model.js";

const gameHandler = {
    // Saving Scores Handler Functions
    saveScore: async (req, res) => {
        const { gameName, score, userId } = req.body;

        const newScore = await Score.create({ gameName, score, userId });
        console.log("Score: ", newScore);

        if (newScore) {
            res.send({
                message: "Created new score",
                success: true,
                newScore
            })
        } else {
            res.send({
                message: "Error with creating/saving score",
                success: false
            })
        }
    }
}

export default gameHandler;