
import { Container, Button } from "react-bootstrap";

// Components
import Number from "../../Number.jsx";

function GameOver() {
    
    return (
        <Container className="mt-5 fade-in">
            <h1 style={{textAlign: "center"}}>You win!</h1>
            <h3 style={{textAlign: "center"}}>Word: {currentGame.word}</h3>
            <label className="score-label">Score: 
                <Number n={currentGame.getScore()}/>
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

export default GameOver;