import { Container, Col, Row } from "react-bootstrap";

const animStr = (i) => `fadeInAnimation ${350}ms ease-out ${0 * (i + 1)}ms forwards`;

function GuessedWords(props) {
    const wordCards = props.guessedWords.map((word, i) => {
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
            <h5 style={{textAlign: "center"}}>Correct Guesses:</h5>
            <Container className="d-flex justify-content-center rounded border border-success mt-4" style={{width: "70%"}}>
                <Row className="my-1"style={{width: "100%"}}>
                    {wordCards}
                </Row>
            </Container>
        </>
    )
}

export default GuessedWords;