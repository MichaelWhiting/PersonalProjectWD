import { Button, Container } from "react-bootstrap";
import { useState } from "react";

function Input(props) {
    const { guessedWords, updateGuessedWords } = props;
    const [guess, setGuess] = useState("");

    const submitGuess = () => { // appends the input guess to the guessedWords array on the parent component
        updateGuessedWords([...guessedWords, guess]); // when making copy of array, you have to spread it like this,
        setGuess("");                                 // otherwise it just creates a pointer to the orignal array
    }

    return(
        <Container className="d-flex justify-content-center my-4">
            <input 
                value={guess} 
                type="Text" 
                placeholder="Enter guess here" 
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") { submitGuess() }
                }}
            />
            <Button 
                className="mx-2" 
                variant="success" 
                onClick={submitGuess}
            >
                Guess
            </Button>
        </Container>
    )
}

export default Input;