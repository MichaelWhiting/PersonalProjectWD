import { Container } from "react-bootstrap";

function Keyboard() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const letterKeys = alphabet.split("").map((letter, i) => {
        return (
            <button 
                className="square border border-primary rounded"
                style={{
                    background: "primary", 
                    display: "inline", 
                    height: "4%", 
                    width: "4%",
                    margin: "1%"
                }}>
                {letter}
            </button>
        )
    })

    return (
        <Container style={{width: "50%", background: "red", textAlign: "center"}}>
            {letterKeys}
        </Container>
    )
}

export default Keyboard;