import { Card } from "react-bootstrap";
// import { requestScores } from "../reducers/leaderboardReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function LeaderboardCard(props) {
    const { gameName, scoreIds } = props.game;
    const loading = useSelector(state => state.leaderboard.loading);
    const scores = useSelector(state => state.leaderboard.scores);
    const dispatch = useDispatch();

    const grabScores = async () => {
        const { data } = await axios.get(`/leaderboard/${gameName}`)
        console.log(data.scores)
        dispatch({
            type: "REQUEST_SCORES",
            payload: data.scores
        })
    }

    
    useEffect(() => {
        grabScores()
        // dispatch(requestScores);
        // requestScores(dispatch, gameName)
    }, []);

    return (
        <Card style={{width: 300}}>
            <Card.Body>
                <Card.Title>{gameName}</Card.Title>
                <Card.Text>Scores: {scoreIds}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default LeaderboardCard;