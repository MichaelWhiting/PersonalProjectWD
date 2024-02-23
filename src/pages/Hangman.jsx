import HangmanGame from "../gameLogic/wordle/hangmanModel.js";
import { Container } from "react-bootstrap";
import { useState } from "react";

// Components
import WordSpaces from "../components/gameComponents/hangmanComponents/WordSpaces.jsx";
import Keyboard from "../components/gameComponents/hangmanComponents/Keyboard.jsx";

const words1 = [
    "mystery", "journey", "wizard", "forest", "castle", "dragon", "puzzle", "secret",
    "mirror", "flower", "winter", "summer", "spring", "autumn", "island", "desert",
    "falcon", "eclipse", "galaxy", "nebula", "comet", "orbit", "photon", "quantum",
    "sphinx", "pyramid", "temple", "canyon", "volcano", "fjord", "glacier", "tundra",
    "jungle", "savanna", "cavern", "goblin", "unicorn", "phoenix", "vampire", "zombie",
    "robot", "cyborg", "portal", "sphere", "vector", "matrix", "quantum", "cosmos",
    "ocean", "eagle"
];

const words = [
    "yoda", "vader", "maul", "kenobi", "rey", "finn", "lando", "chewbacca", "phasma", "hux",
    "snoke", "grievous", "kylo", "mace", "jango", "boba", "dooku", "quigon", "padme"
];

function Hangman() {
    // if this is generated, it means to start a new game
    const randomWord = words[Math.floor(Math.random() * words.length - 1)];
    const initialStatus = randomWord.split("").map((_) => "_").join("");
    const [wordStatus, setWordStatus] = useState(initialStatus);
    const [newGame, setNewGame] = useState(new HangmanGame(randomWord, 0, 5));

    const updateWordStatus = (newStatus) => setWordStatus(newStatus);

    return (
        <Container fluid>
            <h1 style={{ textAlign: "center" }}>Word is: "{newGame.word}"</h1>
            <WordSpaces wordStatus={wordStatus} />
            <Keyboard wordStatus={wordStatus} checkGuess={newGame.checkGuess} updateWordStatus={updateWordStatus} />
        </Container>
    )
}

export default Hangman;