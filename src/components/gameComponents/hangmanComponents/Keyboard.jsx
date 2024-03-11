import { Container } from "react-bootstrap";
import Timer from "./Timer";
import { useState } from "react";
import c from "../../../classStrings.js";
function Keyboard(props) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const { checkGuess, updateWordStatus, wordStatus, updateTime } = props;
    const [getTime, setGetTime] = useState(false);

    const letterKeys = alphabet.split("").map((letter, i) => { // creates a button for each letter in the alphabet
        return (
            <button
                className={`${c.roundedBorder} letter-key`}
                key={i}
                onClick={function(e) { 
                    e.currentTarget.disabled = true; // disables the button after pressed once
                    const newWordStatus = checkGuess(letter, wordStatus); // checks if the letter is in the word, gets new status
                    if (!newWordStatus.includes("_")) { // if it doesn't include any "_" it means the game is over
                        setGetTime(!getTime); // tells the Hangman parent component to get the time from the timer component
                        console.log("getTime: ", getTime);
                    }
                    updateWordStatus(newWordStatus); // updates the wordStatus on the Hangman parent component
                }}
            >
                {letter}
            </button>
        );
    });

    return (
        <Container style={{ width: "70%", textAlign: "center" }}>
            {letterKeys}
            <Timer getTime={getTime} updateTime={updateTime}/>
        </Container>
    );
}

export default Keyboard;
