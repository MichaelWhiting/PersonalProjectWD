import ScrambleGame from "../gameLogic/scrambleModel.js";
import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion"
import c from "../classStrings.js";

// Components
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

function Scramble() {
    const [currentGame, setCurrentGame] = useState(new ScrambleGame());
    const [letters, setLetters] = useState([]);

    const [gameOver, setGameOver] = useState(false);
    const [key, setKey] = useState(false)

    const scrambleWord = (word) => {
        let scrambledWord = "";
        let strarray = word.split('');

        var i, j, k
        for (i = 0; i < strarray.length; i++) {
            j = Math.floor(Math.random() * i)
            k = strarray[i]
            strarray[i] = strarray[j]
            strarray[j] = k
        }
        scrambledWord = strarray.join('');

        return scrambledWord;
    }

    const startNewGame = () => {
        const randomNum = Math.floor(Math.random() * words.length);
        const word = words[randomNum];
        let scrambledWord = scrambleWord(word);

        setLetters(scrambledWord.split(""));
        setCurrentGame(new ScrambleGame(word));
        console.log(word, scrambledWord);
    }


    useEffect(() => {
        startNewGame();
    }, [key]);
    
    useEffect(() => {
        if (letters.join("") === currentGame.word) {
            setInterval(() => {
                setGameOver(true);
            }, 1000);
        }
    }, [letters]);

    return !gameOver ? (
        <Container className={`${c.containerColCenter} fade-in`} style={{width: "100%"}}>
            <Reorder.Group as="div" axis="x" values={letters} onReorder={setLetters} className={`${c.roundedBorder} ${c.containerCenter} my-3 fade-in`}>
                {letters.map((letter, i) => (
                <Reorder.Item as="label" key={letter} value={letter} className="mx-3 align-items-center" style={{width: 100, height: 100, fontSize: 55, textAlign: "center", background: "#"}}>
                    <Container className="rounded border border-success">
                    {letter}
                    </Container>
                </Reorder.Item>
                ))}
            </Reorder.Group>
            <h1>Reorder the scarmbled letters into a word!</h1>
        </Container>
    ) : (
        <Container className="mt-5 fade-in">
            <h1 style={{textAlign: "center"}}>You win!</h1>
            <h3 style={{textAlign: "center"}}>Word: {currentGame.word}</h3>
            <label className="score-label">Score: 
                <Number n={currentGame.getScore()}/>
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
        </Container>    )
}

export default Scramble;