import { Card, Container } from "react-bootstrap";
// import { requestScores } from "../reducers/leaderboardReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function LeaderboardCard(props) {
    const { gameName, scoreIds } = props.game;

    const [loading, setLoading] = useState(false);
    const [scores, setScores] = useState([]);

    const getScores = async () => {
        const { data } = await axios.get(`leaderboard/${gameName}`);
        setScores(data.scores.sort((a, b) => a.score + b.score));
        setLoading(false);
    }

    const scoreLabels = scores.map((score, i) => {
        return (
            <Container key={i}>
                <li>{score.score}</li>
            </Container>
        )
    })
    
    useEffect(() => {
        setLoading(true);
        getScores();
    }, []);

    return !loading ? (
        <Card style={{width: 300}}>
            <Card.Body>
                <Card.Title>{gameName}</Card.Title>
                <ol style={{background: "#FAF9F6"}}>{scoreLabels}</ol>
            </Card.Body>
        </Card>
    ) : (
        <h1>Loading page</h1>
    )
}

export default LeaderboardCard;