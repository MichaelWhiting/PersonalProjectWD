import WordSpaces from "../components/gameComponents/hangmanComponents/WordSpaces.jsx";
import Keyboard from "../components/gameComponents/hangmanComponents/Keyboard.jsx";
import { Container } from "react-bootstrap";

function Hangman() {
    return (
        <Container fluid style={{background: "green"}}>
            <WordSpaces word="apple"/>
            <Keyboard/>
        </Container>
    )
}

export default Hangman;