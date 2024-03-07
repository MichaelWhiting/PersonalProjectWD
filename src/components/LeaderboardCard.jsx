import { Card, Container} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const animStr = (i) => `fadeInAnimation ${750}ms ease-out ${90 * (i + 2)}ms forwards`;

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

    const scoreLabels = scoresAndUsers.slice(3).map((item, i) => {
        return (
            <div 
                key={i} 
                className="rounded border border-success my-2"
                style={{background: "#FFFFFF", animation: animStr(i), opacity: 0}}
                >
                <label style={{width: "15%%", padding: 10}}>
                    {i + 4}.
                </label>
                <label style={{width: "70%", padding: 10}}>
                    {item.user.username}
                </label>
                <label style={{ width: "15%", textAlign: "right"}}>
                    {item.score.score}
                </label>
            </div>
        )
    });

    const podium = [...scoresAndUsers].splice(0,3).map((item, i) => {
        if (i === 0) {
            return (
                <div key={i} pos={2} className="first rise-up border border-dark mx-1" style={{background: "gold", width: "30%", height: 100, overflow: "hidden"}}>
                    <label className="my-1" style={{textAlign: "center", width: "100%"}}>{item.user.username}</label>
                    <label style={{textAlign: "center", width: "100%"}}>{item.score.score}</label>
                </div>
            )
        } else if (i === 1) {
            return (
                <div key={i} pos={1} className="second rise-up border border-dark" style={{background: "silver", width: "30%", height: 75, overflow: "hidden"}}>
                    <label className="my-1" style={{textAlign: "center", width: "100%"}}>{item.user.username}</label>
                    <label style={{textAlign: "center", width: "100%"}}>{item.score.score}</label>
                </div>
            )
        } else {
            return (
                <div key={i} pos={3} className="third rise-up border border-dark" style={{background: "burlywood", width: "30%", height: 50, overflow: "hidden"}}>
                    <label style={{textAlign: "center", width: "100%"}}>{item.user.username}</label>
                    <label className="mb-1" style={{textAlign: "center", width: "100%"}}>{item.score.score}</label>
                </div>
            )
        }
    }).sort((a, b) => {
        return a.props.pos - b.props.pos;
    });
    
    useEffect(() => {
        getScoresAndUsers();
    }, []);

    return (
        <Card className="mx-5 my-4 border border-success fade-in-slow" style={{ width: 400, height: 500, background: "#FAF9F6"}}>
            <Card.Header>
                <Card.Title>
                    <Link className="nav-link" to={"/" + gameName.toLowerCase()}>
                        <Icon.Controller style={{width: 30, height: 30, marginRight: 5}}/>
                        {gameName}
                    </Link>
                </Card.Title>
            </Card.Header>
            <Card.Body className="overflow-scroll">
                <Container 
                    className="d-flex justify-content-center align-items-end my-3 ms-1 fade-in"
                    style={{height: 100}}
                    >
                    {podium}
                </Container>
                {scoreLabels}
            </Card.Body>
        </Card>
    )
}

export default LeaderboardCard;