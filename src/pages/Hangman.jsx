import WordSpaces from "../components/gameComponents/hangmanComponents/WordSpaces.jsx";
import Keyboard from "../components/gameComponents/hangmanComponents/Keyboard.jsx";
import { Container } from "react-bootstrap";
import HangmanGame from "../gameLogic/wordle/hangmanModel.js";

const words = [
    "mystery", "journey", "wizard", "forest", "castle", "dragon", "puzzle", "secret",
    "mirror", "flower", "winter", "summer", "spring", "autumn", "island", "desert",
    "falcon", "eclipse", "galaxy", "nebula", "comet", "orbit", "photon", "quantum",
    "sphinx", "pyramid", "temple", "canyon", "volcano", "fjord", "glacier", "tundra",
    "jungle", "savanna", "cavern", "goblin", "unicorn", "phoenix", "vampire", "zombie",
    "robot", "cyborg", "portal", "sphere", "vector", "matrix", "quantum", "cosmos",
    "ocean", "eagle"
];

function Hangman() {
    // if this is generated, it means to start a new game
    const randomWord = words[Math.floor(Math.random() * words.length - 1)];
    const newGame = new HangmanGame(randomWord, 0, 5);

    return (
        <Container fluid>
            <WordSpaces word={newGame.word}/>
            <Keyboard checkGuess={newGame.checkGuess}/>
        </Container>
    )
}

export default Hangman;