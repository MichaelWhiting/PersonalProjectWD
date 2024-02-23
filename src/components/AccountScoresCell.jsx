import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

function AccountScoresCell() {
    // make a array of the scores of the user later
    const [scores, setScores] = useState([]);

    const getUsersScores = async () => {
        const res = await axios.get("/user/getUser");
        const userId = res.data.user.userId;
        const res2 = await axios.get(`/scores/${userId}`);
        return res2;
    }

    useEffect(async () => {
        const tempScores = await getUsersScores();
        setScores(tempScores);
    }, [])

    return (
        <Container className="border border-success rounded p-5">
            <h3>Scores(placeholders)</h3>
            <p>Wordle: 4</p>
            <p>Wordle: 6</p>
            <p>MazeGame: 100</p>
        </Container>
    )
}

export default AccountScoresCell;