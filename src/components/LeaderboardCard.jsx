import { Card, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
// import { requestScores } from "../reducers/leaderboardReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function LeaderboardCard(props) {
    const [scoresAndUsers, setScoresAndUsers] = useState([]);
    const { gameName } = props.game;
    
    const getScoresAndUsers = async () => { // optimize this function later if have time
        const scoresObjArr = [];
        const { data } = await axios.get(`/leaderboard/${gameName}`);
        const scoresArr = data.scores.sort((a, b) => b.score - a.score);

        for (const score of scoresArr) {
            const res = await axios.get(`/score/${score.userId}`);
            const user = res.data.user;
            scoresObjArr.push({ score, user });
        }

        setScoresAndUsers(scoresObjArr);
    }

    const scoreLabels = scoresAndUsers.map((item, i) => {
        return (
            <li key={i}>{item.user.username}: {item.score.score}</li>
        )
    })
    
    useEffect(() => {
        getScoresAndUsers();
    }, []);

    return (
        <Card className="mx-5 mt-5 border border-success" style={{ width: "20%", height: 400, background: "#FAF9F6"}}>
            <Card.Header>
                <Card.Title>
                    <Link className="nav-link" to={"/" + gameName.toLowerCase()}>
                        <Icon.Controller style={{width: 30, height: 30, marginRight: 5}}/>
                        {gameName}
                    </Link>
                </Card.Title>
            </Card.Header>
            <Card.Body className="overflow-scroll">
                <ol>{scoreLabels}</ol>
            </Card.Body>
        </Card>
    )
}

export default LeaderboardCard;


// const scoresObjArr = [];
// const { data } = await axios.get(`/leaderboard/${gameName}`);
// const scoresArr = data.scores.sort((a, b) => b.score - a.score);
// const promises = [];

// let scoreObj = {};

// for (const score of scoresArr) {
//     const res = axios.get(`/score/${score.userId}`);
//     promises.push(res);
//     console.log(":",score)
//     scoreObj = { score: score.score }
// }

// Promise.all(promises).then((responses) => {
//     for (const res of responses) {
//         const user = res.data.user;
//         console.log(scoreObj)
//         scoresObjArr.push({ score, user });
//     }

//     setScoresAndUsers(scoresObjArr);
// })