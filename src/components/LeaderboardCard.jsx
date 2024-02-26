import { Card, Container } from "react-bootstrap";
// import { requestScores } from "../reducers/leaderboardReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function LeaderboardCard(props) {
    const { gameName } = props.game;
    const [scoresAndUsers, setScoresAndUsers] = useState([]);

    const getScoresAndUsers = async () => {
        const scoresObjArr = [];
        const { data } = await axios.get(`/leaderboard/${gameName}`);
        const scoresArr = data.scores.sort((a, b) => b.score - a.score);
        console.log(scoresArr)
        for (const score of scoresArr) {
            const res = await axios.get(`/score/${score.userId}`);
            const user = res.data.user;
            scoresObjArr.push({ score, user });
        }

        // console.log(scoresObjArr)
        setScoresAndUsers(scoresObjArr);
    }

    const scoreLabels = scoresAndUsers.map((item, i) => {
        return (
            <p key={i}>
                {item.user.username}: {item.score.score}
            </p>
        )
    })
    
    useEffect(() => {
        getScoresAndUsers();
    }, []);

    return (
        <Card className="mx-5 mt-5 border border-success overflow-scroll" style={{ width: "20%", height: 400, background: "#FAF9F6"}}>
            <Card.Body>
                <Card.Title>{gameName}</Card.Title>
                {scoreLabels}
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