import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";  

// import animStr from "../animations.js";
// const animStr = (i) => `fadeInAnimation ${300}ms ease-out ${50 * (i + 1)}ms forwards`;

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
    
    const scoreCards = scores.map((score, i) => {
        return (
            <p
                key={i} 
                // style={{animation: animStr(i)}}
            >
            {score.gameName}: {score.score}
            </p>
        )}
    );

    return (
        <Container style={{height: "90%"}} className="border border-success rounded p-5 mx-3 overflow-scroll">
            <h3>{username}'s Scores:</h3>
            {scoreCards}    
        </Container>
    )
}

export default AccountScoresCell;