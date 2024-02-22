import { Container } from "react-bootstrap";
import AccountEditCell from "../components/AccountEditCell.jsx";
import AccountScoresCell from "../components/AccountScoresCell.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function AccountPage() {
    const [user, setUser] = useState({});

    const getUserInfo = async () => {
        const { data } = await axios.get("/user/getUser");
        setUser(data.user);
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center border border-success rounded p-5" style={{ background: "#FAF9F6", width: 800 }}>
            <Container className="d-flex vh-80 justify-content-center">
                <h2 style={{ color: "#198754" }}>Hello, {user.username}! Here is your account info:</h2>
            </Container>
            <Container className="d-flex vh-20 justify-content-center align-items-center">
                <AccountEditCell />
                <AccountScoresCell />
            </Container>
        </Container>
    )
}

export default AccountPage;