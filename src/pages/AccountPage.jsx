import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import AccountEditCell from "../components/AccountEditCell.jsx";
import AccountScoresCell from "../components/AccountScoresCell.jsx";

function AccountPage() {
    const userId = useSelector(state => state.userId);
    const [user, setUser] = useState({});
    const [scores, setScores] = useState([]);
    const dispatch = useDispatch();

    const getUserScores = async () => {
        const { data } = await axios.get(`/scores/${userId}`);
        setScores(data.scores);
        console.log(scores);
    }

    const getUser = async () => {
        const { data } = await axios.get(`/score/${userId}`);
        setUser(data.user);
    }

    useEffect(() => {
        getUserScores();
        getUser();
    }, [])

    const logout = async () => {
        const { data } = await axios.get("/logout");
        if (data.success) {
            dispatch({
                type: "LOGOUT"
            })
        }
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center border border-success rounded p-5" style={{ background: "#FAF9F6", width: 800 }}>
            <Container className="d-flex vh-80 justify-content-center">
                <h2 style={{ color: "#198754" }}>Hello, {user.username}! Here is your account info:</h2>
            </Container>
            <Container className="d-flex vh-20 justify-content-center align-items-center">
                <AccountEditCell />
                <AccountScoresCell />
            </Container>
            <Button variant="success" onClick={logout}>Logout</Button>
        </Container>
    )
}

export default AccountPage;