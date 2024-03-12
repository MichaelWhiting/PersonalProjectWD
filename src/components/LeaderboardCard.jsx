import { Card, Container} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import c from "../classStrings.js";
import axios from "axios";

const animStr = (i) => `fadeInAnimation ${750}ms ease-out ${90 * (i + 2)}ms forwards`; // animation used for fading in.

function LeaderboardCard(props) {
    const [scoresAndUsers, setScoresAndUsers] = useState([]);
    const { gameName } = props.game;
    
    const getScoresAndUsers = async () => {
        const scoresObjArr = []; // creates a temporary array to store the response.
        const { data } = await axios.get(`/leaderboard/${gameName}`); // gets all of the scores for specific game
        const scoresArr = data.scores.sort((a, b) => b.score - a.score); // sorts them highest to low

        for (const score of scoresArr) { // iterates through each of the scores
            const res = await axios.get(`/score/${score.userId}`); // gets the user for each score
            const user = res.data.user;
            scoresObjArr.push({ score, user }); // pushes it to the temporary array, got user so we can put the username on
        }                                       // each score

        setScoresAndUsers(scoresObjArr); // now that the array has both the scores AND users, sets it to the state var
    }

    const scoreLabels = scoresAndUsers.slice(3).map((item, i) => { // this is creating labels for all of the scores besides the top 3
        return (
            <div 
                key={i} 
                className={`${c.roundedBorder} my-2`}
                style={{background: "#FFFFFF", animation: animStr(i), opacity: 0}}
            >
                <label style={{width: "15%%", padding: 10}}>{i + 4}.</label>
                <label style={{width: "70%", padding: 10}}>{item.user.username}</label>
                <label style={{ width: "14%", textAlign: "right"}}>{item.score.score}</label>
            </div>
        )
    });

    const podium = [...scoresAndUsers].splice(0,3).map((item, i) => { // this gets the top 3 scores from the scoresAndUsers array
        if (i === 0) { // this is 1st place, but we want it to be in the middle so it gives it the pos # of 2
            return (
                <div key={i} pos={2} className={`${c.podium} mx-1 w30`} style={{background: "gold", height: 100}}>
                    <label className="center my-1">{item.user.username}</label>
                    <label className="center">{item.score.score}</label>
                </div>
            )
        } else if (i === 1) { // this is 2nd place, but we want it to be on the left so it gives it the pos # of 1
            return (
                <div key={i} pos={1} className={`${c.podium} w30`} style={{background: "silver", height: 75}}>
                    <label className="center my-1">{item.user.username}</label>
                    <label className="center">{item.score.score}</label>
                </div>
            )
        } else { // this is 3rd place, but we want it to be on the right so it gives it the pos # of 3
            return ( 
                <div key={i} pos={3} className={`${c.podium} w30`} style={{background: "burlywood", height: 50}}>
                    <label className="center">{item.user.username}</label>
                    <label className="center">{item.score.score}</label>
                </div>
            )
        }
    }).sort((a, b) => { // this sorts the podium divs by their pos property. This gets them in the order we want.
        return a.props.pos - b.props.pos;
    });
    
    useEffect(() => { // when the page originally loads, this is getting all of the scores for each game, and the
        getScoresAndUsers();  // users tied to each score.
    }, []);

    return ( // Creating a Card, populating it with the scores for that specific game.
        <Card className="card border border-success mx-5 my-4 fade-in-slow">
            <Card.Header>
                <Card.Title>
                    <Link className="nav-link" to={"/" + gameName.toLowerCase()}>
                        <Icon.Controller style={{width: 30, height: 30, marginRight: 5}}/>
                        {gameName}
                    </Link>
                </Card.Title>
            </Card.Header>
            <Card.Body className="overflow-scroll">
                <Container className={`${c.containerEnd} my-3 ms-1 fade-in`} style={{height: 100}}>
                    {podium}
                </Container>
                {scoreLabels}
            </Card.Body>
        </Card>
    )
}

export default LeaderboardCard;