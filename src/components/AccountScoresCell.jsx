import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import c from "../classStrings.js";
import axios from "axios"; 
 
const animStr = (i) => `fadeInAnimation ${750}ms ease-out ${90 * (i + 2)}ms forwards`; // animation for fading in

function AccountScoresCell(props) {
    const userId = useSelector(state => state.userId); // gets the userId from redux store
    const [scores, setScores] = useState([]);
    const { username } = props;

    const getUserScores = async () => {
        if (userId) { // this makes sure the user is logged in before attempting to get scores
            const { data } = await axios.get(`/scores/${userId}`); // gets all of the scores tied to that user

            if (data.success) { // if it finds the scores
                setScores(data.scores.sort((a, b) => b.score - a.score)); // sorts them highest -> lowest
            }
        }
    }

    useEffect(() => { // on the initial render, gets all of the scores for that user.
        getUserScores();
    }, [])
    
    const scoreCards = scores.map((score, i) => { // creates a label for each of the scores
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

    return (
        <Container className={`${c.roundedBorder} p-5 mx-3 overflow-scroll`} style={{height: "90%", background: "#FFFFFF"}}>
            <h3>{username}'s Scores:</h3>
            <hr/>
            {scoreCards}    
        </Container>
    )
}

export default AccountScoresCell;