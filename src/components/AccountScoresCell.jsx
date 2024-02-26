import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";  

function AccountScoresCell(props) {
    const username = props.username;
    const [scores, setScores] = useState([]);
    const dispatch = useDispatch();

    const getUserScores = async () => {
        const { data } = await axios.get(`/scores/${0}`); // 0 should be userId
        setScores(data.scores.sort((a, b) => b.score - a.score));
    }

    useEffect(() => {
        getUserScores();
    }, [])
    
    const scoreCards = scores.map((score) => <p>{score.gameName}: {score.score}</p>);

    return (
        <Container className="border border-success rounded p-5">
            <h3>{username}'s Scores:</h3>
            {scoreCards}
        </Container>
    )
}

export default AccountScoresCell;