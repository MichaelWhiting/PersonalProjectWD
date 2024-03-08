import { Container, Button, Row, Col, Spinner } from "react-bootstrap";
import { useState } from "react";
import OpenAI from "openai";
import c from "../../../classStrings.js";

// Components
import Number from "../../Number.jsx";

const animStr = (i) => `fadeInAnimation ${350}ms ease-out ${75 * (i + 1)}ms forwards`;

function GameOver(props) {
    const { startNewGame, guessedWords, currentGame } = props;
    const [category, setCategory] = useState("");
    const wordSet = new Set(guessedWords);
    const [loading, setLoading] = useState(false);

    const wordCards = [...wordSet].map((word, i) => {
        const isCorrect = currentGame.checkGuess(word);

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
        if (category === "") {
            console.log("input is blank");
            return;
        };

        setLoading(true);
        const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });

        const question = `
        Create a list of the top 75 most popular ${category}. Make all of the strings lowercase and remove any - and replace it with a space. 
        Keep spaces if they are already there. Make 100% sure that every string item in the array is fully lowercased. 
        Make sure that everything in the array is NOT plural, make them singular. Make sure that everything in the array is NOT plural, make them singular. 
        Do not repeat things in the array.
        Do not include any explanations or backticks around the response, only provide a RFC8259 compliant JSON response following this format without deviation.
        {
            'CategoryName': ['item1', 'item2', item3']
        }
         The JSON response:
        `

        openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: question }]
        }).then((res) => {
            const message = res.choices[0].message.content;
            console.log(res.choices[0].message);
            const gameInfo = JSON.parse(message);
            setLoading(false);
            startNewGame(gameInfo);
        })
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
                    <h5>New Game</h5>
                }
            </Button>
        </Container>
    )
}

export default GameOver;