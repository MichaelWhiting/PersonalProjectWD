import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";  

function AccountScoresCell(props) {
    const userId = useSelector(state => state.userId);
    const username = props.username;
    const [scores, setScores] = useState([]);

    const getUserScores = async () => {
        if (userId) {
            const { data } = await axios.get(`/scores/${userId}`);
            console.log(data.success);

            if (data.success) {
                setScores(data.scores.sort((a, b) => b.score - a.score));
            }
        }
    }

    useEffect(() => {
        getUserScores();
    }, [])
    
    const scoreCards = scores.map((score, i) => <p key={i}>{score.gameName}: {score.score}</p>);

    return (
        <Container style={{height: "80%"}} className="border border-success rounded p-5 mx-3 overflow-scroll">
            <h3>{username}'s Scores:</h3>
            {scoreCards}
        </Container>
    )
}

export default AccountScoresCell;