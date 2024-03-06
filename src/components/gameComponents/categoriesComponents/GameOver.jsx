import { Container, Button, Row, Col, Spinner } from "react-bootstrap";
import { useState } from "react";
import OpenAI from "openai";

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

    const createGameInfo = async () => {
        if (category === "") {
            console.log("input is blank");
            return;
        };

        setLoading(true);
        const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });

        // const question = `Generate me a string that would be able to be parsed into JavaScript. 
        // Make the string itself be an object, where the key is the name of the category as a string, 
        // and the value is an array of values. Make the value an array of the top 75 most popular ${category}.
        // Make all of the strings in the array lowercased, remove any - from them and replace it with a space. 
        // Do not have any backticks in the response, I am looking for a string only response. 
        // Do not respond trying to display as code, I only want a string. 
        // Here is an example of the response I'm looking for: {'fruits': ['apple', 'banana']}. 
        // Don't enclose the outer object in single (') or double quotes("), provide it as it is. 
        // Make the key of the object a string`

        const question = `
        Create a list of the top 75 most popular ${category}. Make all of the strings lowercase and remove any - and replace it with a space. Keep spaces if they are already there.
        Do not include any explanations or backticks around the response, only provide a RFC8259 compliant JSON response following this format without deviation.
        Make 100% sure that every string item in the array is fully lowercased.
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
            console.log(res.choices[0].message)
            const gameInfo = JSON.parse(message)
            setLoading(false);
            startNewGame(gameInfo)
        })
    }

    return (
        <Container className="my-4 rounded border border-success fade-in" style={{background: "#FAF9F6"}}>
            {wordCards.length !== 0 &&
                <>
                    <h1 className="mt-5" style={{ textAlign: "center" }}>Game Over!</h1>
                            <label style={{ fontWeight: 100, fontSize: 50, color: "#198754", textAlign: "center", width: "100%" }}>
                                <Number n={currentGame.getScore(guessedWords)} />
                            </label>
                    <Container
                        className="d-flex justify-content-center align-items-center rounded border border-success fade-in"
                        style={{ width: "70%" }}
                    >
                        <Row className="my-1" style={{ width: "100%" }}>
                            {wordCards}
                        </Row>
                    </Container>
                </>
            }
            <h1 className="mt-5" style={{ textAlign: "center" }}>Game Settings:</h1>
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