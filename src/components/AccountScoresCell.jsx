import { useEffect, useState } from "react";
import { Container, PageItem, Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import c from "../classStrings.js";
import axios from "axios"; 
 
const animStr = (i) => `fadeInAnimation ${750}ms ease-out ${50 * (i + 1)}ms forwards`; // animation for fading in

function AccountScoresCell(props) {
    const userId = useSelector(state => state.userId); // gets the userId from redux store
    const [scores, setScores] = useState([]);
    const [scoreType, setScoreType] = useState("All");
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
    }, []);
    
    const scoreCards = scoreType !== "All" ? scores.filter((score) => score.gameName === scoreType).map((score, i) => { // creates a label for each of the scores
        return (
            <div 
                key={i} 
                className={`${c.roundedBorder} my-2`}
                style={{background: "#FFFFFF", animation: animStr(i), opacity: 0}}
            >
                <label style={{width: "10%", padding: 10}}>{i + 1}.</label>
                <label style={{width: "80%", padding: 10}}>{score.gameName}</label>
                <label style={{width: "5%", padding: 10}}>{score.score}</label>
            </div>
        )}
    ) : scores.map((score, i) => { // creates a label for each of the scores
        return (
            <div 
                key={i} 
                className={`${c.roundedBorder} my-2`}
                style={{background: "#FFFFFF", animation: animStr(i), opacity: 0}}
            >
                <label style={{width: "10%", padding: 10}}>{i + 1}.</label>
                <label style={{width: "80%", padding: 10}}>{score.gameName}</label>
                <label style={{width: "5%", padding: 10}}>{score.score}</label>
            </div>
        )}
    )

    return (
        <Container className={`${c.roundedBorder} p-3 px-5 mx-3 mb-5 overflow-scroll`} style={{height: 500, width: "90%", background: "#FAF9F6"}}>
            <Container fluid className={`${c.containerCenter} align-items-top`}>
                <label className="subtitle-left" style={{height: 50}}>{username}'s Scores:</label>
                <Pagination className="text-center" style={{height: 25}}>
                    <Pagination.Item onClick={() => setScoreType("All")} linkStyle={{color: "green"}}>All</Pagination.Item>
                    <Pagination.Item onClick={() => setScoreType("Hangman")} linkStyle={{color: "green"}}>Hangman</Pagination.Item>
                    <Pagination.Item onClick={() => setScoreType("Categories")} linkStyle={{color: "green"}}>Categories</Pagination.Item>
                    <Pagination.Item onClick={() => setScoreType("Scramble")} linkStyle={{color: "green"}}>Scramble</Pagination.Item>
                </Pagination>
            </Container>
            <hr/>
            <div className="fade-in">
                {scoreCards}
            </div>
        </Container>
    )
}

export default AccountScoresCell;