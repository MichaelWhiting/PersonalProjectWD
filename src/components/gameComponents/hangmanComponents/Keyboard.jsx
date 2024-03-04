import { Container } from "react-bootstrap";
import Timer from "./Timer";
import { useState } from "react";

function Keyboard(props) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const { checkGuess, updateWordStatus, wordStatus, updateTime } = props;
    const [getTime, setGetTime] = useState(false);

    const letterKeys = alphabet.split("").map((letter, i) => {
        return (
            <button
                className="square border border-success rounded"
                key={i}
                style={{
                    background: "primary",
                    display: "inline",
                    height: 50,
                    width: "8%",
                    margin: "1%",
                }}
                onClick={function(e) { 
                    e.currentTarget.disabled = true
                    const newWordStatus = checkGuess(letter, wordStatus);
                    if (!newWordStatus.includes("_")) {
                        setGetTime(!getTime);
                        console.log("getTime: ", getTime);
                    }
                    updateWordStatus(newWordStatus);
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
