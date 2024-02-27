import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import AccountEditCell from "../components/AccountEditCell.jsx";
import AccountScoresCell from "../components/AccountScoresCell.jsx";
import { useNavigate } from "react-router-dom";

function AccountPage() {
    const userId = useSelector(state => state.userId); // setting this to 0 for now
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const getUser = async () => {
        if (userId) {
            const { data } = await axios.get(`/getUser/${userId}`); // 0 should be userId
            setUser(data.user);
        } else {
            navigate("/logincreate/login")
        }
    }

    useEffect(() => {
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
        <Container 
            className="d-flex flex-column justify-content-center align-items-center border border-success rounded p-5 mt-5" 
            style={{ background: "#FAF9F6", width: 800 }}>
            <Container className="d-flex vh-80 justify-content-center">
                <h2 style={{ color: "#198754" }}>Hello, {user.username}! Here is your account info:</h2>
            </Container>
            <Container className="d-flex justify-content-center align-items-center" style={{height: 500}}>
                <AccountEditCell />
                <AccountScoresCell username={user.username}/>
            </Container>
            <Button variant="success" onClick={logout}>Logout</Button>
        </Container>
    )
}

export default AccountPage;