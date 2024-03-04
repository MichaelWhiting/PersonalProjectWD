import { Container, Button, Row, Col } from "react-bootstrap";
import Number from "../../Number.jsx";
import { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const animStr = (i) => `fadeInAnimation ${350}ms ease-out ${75 * (i + 1)}ms forwards`;

function GameOver(props) {
    const { startNewGame, guessedWords, currentGame } = props;
    const wordSet = new Set(guessedWords);

    const wordCards = [...wordSet].map((word, i) => {
        const isCorrect = currentGame.checkGuess(word);

        return (
            <Col xs={3}
                key={i}
                md="auto"
                className="rounded border px-2 py-2 mx-3 my-3"
                style={{ background: isCorrect ? "#00DE6F" : "#FF5F5F", animation: animStr(i), opacity: 0, textAlign: "center" }}
            >
                {word}
            </Col>
        )
    });

    return (
        <div>
            <h1 className="mt-5" style={{ textAlign: "center" }}>Game Over!</h1>
            { wordCards.length !== 0 &&
                <Container
                    className="d-flex justify-content-center align-items-center rounded border border-success fade-in"
                    style={{ width: "70%" }}
                    >
                    <Row className="my-1" style={{ width: "100%" }}>
                        {wordCards}
                    </Row>
                </Container>
            }
            <label style={{ fontWeight: 100, fontSize: 50, color: "#198754", textAlign: "center", width: "100%" }}>
                <Number n={currentGame.getScore(guessedWords)} />
            </label>
            <Button
                className="mt-3"
                style={{ display: "block", margin: "auto" }}
                variant="outline-success"
                onClick={startNewGame}
            >
                New Game
            </Button>
        </div>
    )
}

export default GameOver;