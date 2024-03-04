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
    const userId = useSelector(state => state.userId);
    const [currentGame, setCurrentGame] = useState(new HangmanGame("_"));
    const [wordStatus, setWordStatus] = useState("_");
    const [gameOver, setGameOver] = useState(false);
    const [key, setKey] = useState(false)
    const [time, setTime] = useState(0);

    const updateWordStatus = (newStatus) => setWordStatus(newStatus);
    const updateTime = (newTime) => setTime(newTime);

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * words.length);
        const word = words[randomNum];// gotta find out why this sometime is undefined
        const initialStatus = word.split("").map((_) => "_").join("");

        setWordStatus(initialStatus);
        setCurrentGame(new HangmanGame(word));
        console.log(word);
    }, [key]);

    const saveScore = async () => {
        if (userId) { // makes sure there is a user to save it to before continuing.
            console.log("The time passed up is :", time);
            const scoreObj = { gameName: "Hangman", score: currentGame.getScore(time), userId };
            const res = await axios.post("/saveScore", scoreObj);

            if (res.data.success) {
                console.log("Saved the score!");
            }
        }
    }

    useEffect(() => { // whenever the wordStatus changes, it checks to see if the player has guessed the word and see 
        if (!wordStatus.includes("_")) {                                                        // if to end the game
            setGameOver(true);
            saveScore();
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
            <label 
                style={{ fontWeight: 100, fontSize: 20, color: "#198754", textAlign: "center", width: "100%" }}
                className="my-3"
                >
                <Icon.InfoCircle className="mx-1"/>
                Scores will only save if you are logged in.
            </label>
        </Container>
    ) : (
        <Container className="mt-5 fade-in">
            <h1 style={{textAlign: "center"}}>You win!</h1>
            <h3 style={{textAlign: "center"}}>Word: {wordStatus}</h3>
            <label style={{fontWeight: 100, fontSize: 50, color: "#198754", textAlign: "center", width: "100%"}}>Score: 
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