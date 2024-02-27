import HangmanGame from "../gameLogic/wordle/hangmanModel.js"; // logic for the game
import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

// Components
import WordSpaces from "../components/gameComponents/hangmanComponents/WordSpaces.jsx";
import Keyboard from "../components/gameComponents/hangmanComponents/Keyboard.jsx";
import Timer from "../components/gameComponents/hangmanComponents/Timer.jsx";

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
    const [wordStatus, setWordStatus] = useState("_");
    const [currentGame, setCurrentGame] = useState(new HangmanGame("_"));
    const [key, setKey] = useState(false)
    const [gameOver, setGameOver] = useState(false);

    const updateWordStatus = (newStatus) => setWordStatus(newStatus);

    useEffect(() => {
        const word = words[Math.floor(Math.random() * words.length - 1)]
        const initialStatus = word.split("").map((_) => "_").join("");
        setWordStatus(initialStatus)
        setCurrentGame(new HangmanGame(word))
        console.log(word)
    }, [key])

    useEffect(() => { // whenever the wordStatus changes, it checks to see if the player has guessed the word and see 
        if (!wordStatus.includes("_")) {                                                        // if to end the game
            setGameOver(true);
        }
    }, [wordStatus])

    return !gameOver ? (
        <Container fluid className="mt-5" key={key}>
            <WordSpaces wordStatus={wordStatus}/>
            <Keyboard 
                wordStatus={wordStatus} 
                checkGuess={currentGame.checkGuess} 
                updateWordStatus={updateWordStatus}/>
            <Timer/>
            <Button 
                style={{display: "block", margin: "auto"}}
                variant="outline-success"
                onClick={() => setKey(!key)}
                >
                Restart Game
            </Button>
        </Container>
    ) : (
        <Container className="mt-5">
            <h1 style={{textAlign: "center"}}>You win!</h1>
            <h3 style={{textAlign: "center"}}>Word: {wordStatus}</h3>
            <Button 
                style={{display: "block", margin: "auto"}}
                variant="outline-success"
                onClick={() => {
                    setKey(!key)
                    setGameOver(false);
                }}
                >
                Restart Game
            </Button>
        </Container>
    )
}

export default Hangman;
