import { Container, Button, Row, Col, Spinner } from "react-bootstrap";
import { useState } from "react";
import OpenAI from "openai";
import c from "../../../classStrings.js";

// Components
import Number from "../../Number.jsx";
import axios from "axios";

const animStr = (i) => `fadeInAnimation ${350}ms ease-out ${75 * (i + 1)}ms forwards`;

function GameOver(props) {
    const { startNewGame, guessedWords, currentGame } = props;
    const [category, setCategory] = useState("");
    const wordSet = new Set(guessedWords); // removes repeats and gets each of the unique answers
    const [loading, setLoading] = useState(false);

    const wordCards = [...wordSet].map((word, i) => { // after the game finishes, this creates a card for each guess
        const isCorrect = currentGame.checkGuess(word);  // checks if the guess is correct

        // the isCorrect colors the background for each card based on whether or not the guess was correct
        return (
            <Col 
                xs={3}
                key={i}
                md="auto"
                className="rounded border px-2 py-2 mx-3 my-3"
                style={{ background: isCorrect ? "#00DE6F" : "#FF5F5F", animation: animStr(i), opacity: 0, textAlign: "center" }}
            >
                {word}
            </Col>
        )
    });

    const createGameInfo = async () => {
        if (category === "") { // makes sure that the category input field was not blank
            console.log("input is blank");
            return;
        };
        setLoading(true); // starts a loading animation to tell the user that ChatGPT is making the array for that category
        const res = await axios.get(`/askGPT/${category}`)
        setLoading(false); // turns off the loading animation
        startNewGame(res.data.parsedRes); // starts a new game and passes in the newly created category object
    }

    return (
        <Container className="my-4 fade-in">
            {wordCards.length !== 0 &&
                <>
                    <label className="title-center">Game Over!</label>
                            <label className="score-label">
                                <Number n={currentGame.getScore(guessedWords)}/>
                            </label>
                    <Container
                        className={`${c.containerCenter} ${c.roundedBorder}`}
                        style={{ width: "70%" }}
                    >
                        <Row className="my-1" style={{ width: "100%" }}>
                            {wordCards}
                        </Row>
                    </Container>
                </>
            }
            <label className="title-center my-3">Game Settings:</label>
            <input
                value={category}
                type="text"
                style={{ width: "20%", marginLeft: "40%" }}
                placeholder="Enter category here"
                onChange={(e) => setCategory(e.target.value)}
            />
            <Button
                className="my-3"
                style={{ display: "block", margin: "auto" }}
                variant="outline-success"
                onClick={createGameInfo}
            >
                {loading &&
                    <Spinner animation='border' role='status' />
                }
                {!loading &&
                    <>New Game</>
                }
            </Button>
        </Container>
    )
}

export default GameOver;