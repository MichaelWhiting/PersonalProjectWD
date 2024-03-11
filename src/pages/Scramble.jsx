import ScrambleGame from "../gameLogic/scrambleModel.js";
import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Reorder } from "framer-motion"
import c from "../classStrings.js";
import axios from "axios";

// Components
import Number from "../components/Number.jsx";
import Timer from "../components/gameComponents/scrambleComponents/Timer.jsx";

const words = [
    'about', 'after', 'basic', 'clear', 'drink', 'earth', 'fruit', 'great', 
    'house', 'input', 'joker', 'knife', 'learn', 'money', 'night', 'ocean', 
    'plant', 'quiet', 'sound', 'train', 'under', 'value', 'water' , 'heart'
];

function Scramble() {
    const userId = useSelector(state => state.userId);
    const [currentGame, setCurrentGame] = useState(new ScrambleGame()); // current instance of ScrambleGame()
    const [letters, setLetters] = useState([]); // current state/order of the letters
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false); // variable to tell what screen to show
    const [key, setKey] = useState(false); // key to tell the page to refresh

    const updateTime = (newTime) => setTime(newTime);

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
        const randomNum = Math.floor(Math.random() * words.length); // gets random #
        const word = words[randomNum]; // gets random word
        let scrambledWord = scrambleWord(word); // scrambles that word

        setLetters(scrambledWord.split("")); // updates letters state variable
        setCurrentGame(new ScrambleGame(word)); // creates new instance of ScrambleGame with the new word.
        // console.log(word, scrambledWord);
    }

    const saveScore = async () => {
        if (userId) { // means the user is logged in
            // sends request to the server to save the new score
            const res = await axios.post("/saveScore", { gameName: "Scramble", score: currentGame.getScore(time), userId });
            console.log(res.success);
        } else {
            console.log("User is not logged in, not going to save the score")
        }
    }


    useEffect(() => { // whenever the key changes, it will start a new game
        startNewGame();
    }, [key]);
    

    useEffect(() => { // runs only once after a game is over.
        if (gameOver) {
            console.log("Ran save score!")
            saveScore(); // saves the score if the user is logged in
        }
    }, [gameOver]);

    useEffect(() => { // whenever letters is changed, it runs this
        if (letters.join("") === currentGame.word) { // checks to see if the letters are in the correct order
            console.log("letters joined:", letters.join(""), "currentWord:", currentGame.word);
            const interval = setInterval(() => { // if they are in the correct order
                console.log("1 sec delay use effect ran"); // wait 1 second
                setGameOver(true); // then change gameOver to true  and go to the GameOver screen.
            }, 1000);
            return () => clearInterval(interval); // clears the current interval to not create exponential intervals
        }
    }, [letters]);

    return !gameOver ? (
        <Container className={`${c.containerColCenter} fade-in`} style={{width: "100%"}}>
            <Reorder.Group as="div" axis="x" values={letters} onReorder={setLetters} className={`${c.roundedBorder} ${c.containerCenter} my-3 fade-in`}>
                {letters.map((letter, i) => (
                <Reorder.Item as="label" key={letter} value={letter} className="letter mx-3 align-items-center">
                    <Container className="rounded border border-success">
                    {letter}
                    </Container>
                </Reorder.Item>
                ))}
            </Reorder.Group>
            <h1>Reorder the scarmbled letters into a word!</h1>
            <Timer updateTime={updateTime}/>
        </Container>
    ) : (
        <Container className="mt-5 fade-in">
            <h1 style={{textAlign: "center"}}>You win!</h1>
            <h3 style={{textAlign: "center"}}>Word: {currentGame.word}</h3>
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

export default Scramble;