import CategoriesGame from "../gameLogic/categoriesModel"; // game logic
import { useState } from "react";

// Components
import GuessedWords from "../components/gameComponents/categoriesComponents/GuessedWords.jsx";
import Input from "../components/gameComponents/categoriesComponents/Input.jsx";
import { Container } from "react-bootstrap";

function Categories() {
    const [currentGame, setCurrentGame] = useState(new CategoriesGame());
    const [guessedWords, setGuessedWords] = useState([]);

    const updateGuessedWords = (newArr) => {
        setGuessedWords(newArr);
    };

    return (
        <Container className="mt-4 rounded border border-success fade-in" style={{background: "#FAF9F6"}}>
            <h1 style={{textAlign: "center"}}>Category is: {currentGame.category}</h1>
            <GuessedWords guessedWords={guessedWords}/>
            <Input guessedWords={guessedWords} updateGuessedWords={updateGuessedWords}/>
        </Container>
    )
}

export default Categories;