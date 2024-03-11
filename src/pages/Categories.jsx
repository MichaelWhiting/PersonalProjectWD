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
    const [currentGame, setCurrentGame] = useState(new CategoriesGame()); // the current game that is being played
    const [guessedWords, setGuessedWords] = useState([]); // all of the words that the player has guessed
    const [gameOver, setGameOver] = useState(true); // used to tell whether to show the GameOver screen or the game itself

    const userId = useSelector(state => state.userId); // the value of userId in the redux store

    const saveScore = async () => {
        if (userId) { // if user is logged in
            const score = currentGame.getScore(guessedWords); // gets the score from the game they just finished
            if (score !== 0) { // makes sure that it isn't === 0
                const res = await axios.post("/saveScore", { score, userId, gameName: "Categories" }); // saves score to the DB
            }
        } else { // means the user isn't logged in
            console.log("user not logged in so not going to save");
        }
    }

    const updateGuessedWords = (newArr) => setGuessedWords(newArr); // used to send down as a prop to send to the input component

    const updateGameOver = (val) => {
        saveScore(); // saves the score
        setGameOver(val) // changes the gameOver state variable to tell React to change the screen to GameOver
    };


    const startNewGame = (gameInfo) => { // means the user started a new game from the GameOver component
        setCurrentGame(new CategoriesGame(gameInfo)); // creates a new game object, with the category the user chose
        setGuessedWords([]); // resets the guessed words
        setGameOver(false); // changes the gameOver state var which takes the user to the component to play the game
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