import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";  
import c from "../classStrings.js";

const animStr = (i) => `fadeInAnimation ${750}ms ease-out ${90 * (i + 2)}ms forwards`;

function AccountScoresCell(props) {
    const userId = useSelector(state => state.userId);
    const [scores, setScores] = useState([]);
    const { username } = props;

    const getUserScores = async () => {
        if (userId) {
            const { data } = await axios.get(`/scores/${userId}`);

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
            <div 
                key={i} 
                className={`${c.roundedBorder} my-2`}
                style={{background: "#FFFFFF", animation: animStr(i), opacity: 0}}
            >
                <label style={{width: "10%", padding: 10}}>{i + 4}.</label>
                <label style={{width: "80%", padding: 10}}>{score.gameName}</label>
                <label style={{width: "5%", padding: 10}}>{score.score}</label>
            </div>
        )}
    );

    return (//animation: animStr(1)
        <Container className={`${c.roundedBorder} p-5 mx-3 overflow-scroll`} style={{height: "90%", background: "#FFFFFF"}}>
            <h3>{username}'s Scores:</h3>
            <hr/>
            {scoreCards}    
        </Container>
    )
}

export default AccountScoresCell;