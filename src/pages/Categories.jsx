import CategoriesGame from "../gameLogic/categoriesModel"; // game logic
import * as Icon from "react-bootstrap-icons";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

// Components
import GuessedWords from "../components/gameComponents/categoriesComponents/GuessedWords.jsx";
import Input from "../components/gameComponents/categoriesComponents/Input.jsx";
import Timer from "../components/gameComponents/categoriesComponents/Timer.jsx";
import GameOver from "../components/gameComponents/categoriesComponents/GameOver.jsx";

function Categories() {
    const [currentGame, setCurrentGame] = useState(new CategoriesGame());
    const [guessedWords, setGuessedWords] = useState([]);
    const [gameOver, setGameOver] = useState(true);

    const userId = useSelector(state => state.userId);

    const saveScore = async () => {
        if (userId) { // if someone is logged in, then save the score under their username
            const score = currentGame.getScore(guessedWords);
            if (score !== 0) {
                const res = await axios.post("/saveScore", { score, userId, gameName: "Categories" });
                console.log("Saved score: ", res.data.success);
            }
        } else {
            console.log("user not logged in so not going to save");
        }
    }

    const updateGuessedWords = (newArr) => setGuessedWords(newArr);

    const updateGameOver = (val) => {
        saveScore();
        setGameOver(val)
    };


    const startNewGame = (gameInfo) => {
        console.log("staring game", gameInfo)
        setCurrentGame(new CategoriesGame(gameInfo));
        console.log("after:", currentGame.gameInfo)
        setGuessedWords([]);
        setGameOver(false);
    }

    return (
        <>
            { !gameOver && 
                <Container className="mt-4 fade-in">
                    <h1 style={{textAlign: "center"}}>Category is: {Object.keys(currentGame.gameInfo)[0]}</h1>
                    <Timer updateGameOver={updateGameOver}/>
                    { guessedWords.length !== 0 &&
                    <GuessedWords guessedWords={guessedWords}/>
                    }
                    <Input guessedWords={guessedWords} updateGuessedWords={updateGuessedWords}/>
                    <label className="info-label my-3">
                        <Icon.InfoCircle className="mx-1 my-2"/>
                        Scores will only save if you are logged in.
                    </label>
                </Container>
            }
            { gameOver &&
                <GameOver startNewGame={startNewGame} guessedWords={guessedWords} currentGame={currentGame}/>        
            }
        </>
    )
}

export default Categories;