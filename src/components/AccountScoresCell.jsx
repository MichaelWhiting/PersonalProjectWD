import { Container } from "react-bootstrap"
import { FloatingLabel } from "react-bootstrap";

function AccountScoresCell() {
    // make a array of the scores of the user later
    return (
        <Container className="rounded" style={{background: "#AEC6CF"}}>
            <h3>Scores(placeholders)</h3>
            <p>Wordle: 4</p>
            <p>Wordle: 6</p>
            <p>MazeGame: 100</p>
        </Container>
    )
}

export default AccountScoresCell;