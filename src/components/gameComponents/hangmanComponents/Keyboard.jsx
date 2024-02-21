import { Container } from "react-bootstrap";

function Keyboard(props) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const { checkGuess } = props;

    const letterKeys = alphabet.split("").map((letter, i) => {
        return (
            <button
                className="square border border-primary rounded"
                key={i}
                style={{
                    background: "primary",
                    display: "inline",
                    height: 50,
                    width: "6%",
                    margin: "1%",
                }}
                onClick={function(e) { 
                    e.currentTarget.disabled = true
                    checkGuess(letter)
                }}
                disabled={false}
            >
                {letter}
            </button>
        );
    });

    return (
        <Container style={{ width: "80%", textAlign: "center" }}>
            {letterKeys}
        </Container>
    );
}

export default Keyboard;
