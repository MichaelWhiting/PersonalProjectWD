import HangmanGame from "../gameLogic/hangmanModel.js"; // logic for the game
import { Container, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// Components
import WordSpaces from "../components/gameComponents/hangmanComponents/WordSpaces.jsx";
import Keyboard from "../components/gameComponents/hangmanComponents/Keyboard.jsx";
import Number from "../components/Number.jsx";

const words = [
    "mystery", "journey", "wizard", "forest", "castle", "dragon", "puzzle", "secret",
    "mirror", "flower", "winter", "summer", "spring", "autumn", "island", "desert",
    "falcon", "eclipse", "galaxy", "nebula", "comet", "orbit", "photon", "quantum",
    "sphinx", "pyramid", "temple", "canyon", "volcano", "glacier", "tundra",
    "jungle", "savanna", "cavern", "goblin", "unicorn", "phoenix", "vampire", "zombie",
    "robot", "cyborg", "portal", "sphere", "vector", "matrix", "quantum", "cosmos",
    "ocean", "eagle"
];

function Hangman() {
    const userId = useSelector(state => state.userId); // userId from redux store
    const [currentGame, setCurrentGame] = useState(new HangmanGame("_"));
    const [wordStatus, setWordStatus] = useState("_");
    const [gameOver, setGameOver] = useState(false);
    const [key, setKey] = useState(false)
    const [time, setTime] = useState(0);

    const updateWordStatus = (newStatus) => setWordStatus(newStatus); // prop to send to the keyboard component
    const updateTime = (newTime) => setTime(newTime); // prop to send to the timer component

    useEffect(() => { // whenever the key state variable changes, run this code(restarts and starts a new game):
        const randomNum = Math.floor(Math.random() * words.length); // random index #
        const word = words[randomNum]; // gets a random word from words array
        const initialStatus = word.split("").map((_) => "_").join(""); // gets a string of "_" with same length as word

        setWordStatus(initialStatus); // updates the wordStatus with the "_" string
        setCurrentGame(new HangmanGame(word)); // creates new instance of the game with the new word and updates state var
        console.log(word); // this is used for testing to see what the word is in the DOM
    }, [key]);

    const saveScore = async () => {
        if (userId) { // makes sure there is a user to save it to before continuing.
            const scoreObj = { gameName: "Hangman", score: currentGame.getScore(time), userId }; // makes a new score obj
            const res = await axios.post("/saveScore", scoreObj); // sends request to server to save that object as a score

            if (res.data.success) {
                console.log("Saved the score!");
            }
        }
    }

    useEffect(() => { // whenever the wordStatus changes
        if (!wordStatus.includes("_")) { // checks to see if the user has fully guessed the word                                             
            setGameOver(true); // if so, sets gameOver to true
            saveScore(); // attempts to save the score
        }
    }, [wordStatus])

    return !gameOver ? (
        <Container fluid className="mt-5 fade-in" key={key}>
            <WordSpaces wordStatus={wordStatus}/>
            <Keyboard 
                wordStatus={wordStatus} 
                checkGuess={currentGame.checkGuess} 
                updateWordStatus={updateWordStatus}
                updateTime={updateTime}
                />
            {/* <Timer/> */}
            <Button 
                style={{display: "block", margin: "auto"}}
                variant="outline-success"
                onClick={() => setKey(!key)}
                >
                Restart Game
            </Button>
            <label className="info-label my-3">
                <Icon.InfoCircle className="mx-1"/>
                Scores will only save if you are logged in.
            </label>
        </Container>
    ) : (
        <Container className="mt-5 fade-in">
            <h1 style={{textAlign: "center"}}>You win!</h1>
            <h3 style={{textAlign: "center"}}>Word: {wordStatus}</h3>
            <label className="score-label">Score: 
                <Number n={currentGame.getScore(time)}/>
            </label>
            <Button 
                style={{display: "block", margin: "auto"}}
                variant="outline-success"
                onClick={() => {
                    setKey(!key);
                    setGameOver(false);
                }}
                >
                Restart Game
            </Button>
        </Container>
    )
}

export default Hangman;