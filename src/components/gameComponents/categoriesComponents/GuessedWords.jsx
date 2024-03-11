import { Container, Col, Row } from "react-bootstrap";
import c from "../../../classStrings.js";

const animStr = (i) => `fadeInAnimation ${350}ms ease-out ${0}ms forwards`;

function GuessedWords(props) {
    const wordCards = props.guessedWords.map((word, i) => { // creates a card for each of the guessed words
        return (
            <Col xs={3} 
                key={i}   
                md="auto"        
                className="rounded border px-2 py-2 mx-3 my-3"
                style={{background: "#FFFFFF", animation: animStr(i), opacity: 0, textAlign: "center"}}
                >
                {word}
            </Col>
        )
    });


    return (
        <>
            <h5 style={{textAlign: "center"}}>Guesses:</h5>
            <Container 
                className={`${c.containerCenter} ${c.roundedBorder} mt-4`}
                style={{width: "70%", maxHeight: 380, overflowY: "scroll"}}
                >
                <Row className="my-1"style={{width: "100%"}}>
                    {wordCards}
                </Row>
            </Container>
        </>
    )
}

export default GuessedWords;