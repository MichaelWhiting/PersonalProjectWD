import ScrambleGame from "../gameLogic/scrambleModel.js";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import c from "../classStrings.js";
import { Reorder } from "framer-motion"

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

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * words.length);
        const word = words[randomNum];
        let scrambledWord = scrambleWord(word);

        setLetters(scrambledWord.split(""));
        setCurrentGame(new ScrambleGame(word, scrambledWord));
        console.log(word);
    }, []);

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

    console.log([...letters].join(""))
    return (
        <Container className={`${c.containerColCenter} fade-in`} style={{width: "100%"}}>
            <Reorder.Group as="div" axis="x" values={letters} onReorder={setLetters} className={`${c.roundedBorder} ${c.containerCenter} my-3 fade-in`}>
                {letters.map((letter, i) => (
                <Reorder.Item as="label" key={letter} value={letter} className="mx-3" style={{width: 100, height: 100, fontSize: 55, textAlign: "center", background: "#"}}>
                    <Container className="rounded border border-success">
                    {letter}
                    </Container>
                </Reorder.Item>
                ))}
            </Reorder.Group>
            <h1>Reorder the scarmbled letters into a word!</h1>
        </Container>
    )
}

export default Scramble;