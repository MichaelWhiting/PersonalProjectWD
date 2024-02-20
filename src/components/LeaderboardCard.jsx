import { Card } from "react-bootstrap";
// import { requestScores } from "../reducers/leaderboardReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { FloatingLabel } from "react-bootstrap";

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

        return data.scores;
    }

    
    useEffect(() => {
        grabScores()
        // dispatch(requestScores);
        // requestScores(dispatch, gameName)
    }, []);

    // const scores1 = grabScores();
    // console.log("scores1", scores1)
    // const scoresList = scores1.map((score) => {
    //     return (
    //         <FloatingLabel>{score}</FloatingLabel>
    //     )
    // });

    return (
        <Card style={{width: 300}}>
            <Card.Body>
                <Card.Title>{gameName}</Card.Title>
                <Card.Text>score placeholder</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default LeaderboardCard;