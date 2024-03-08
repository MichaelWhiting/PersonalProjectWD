import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

import c from "../classStrings.js";

// Components
import AccountSettingsCell from "../components/AccountSettingsCell.jsx";
import AccountScoresCell from "../components/AccountScoresCell.jsx";
import { useNavigate } from "react-router-dom";

function AccountPage() {
    const userId = useSelector(state => state.userId);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUser = async () => {
        if (userId) { // since this page deals with the account, it checks to see if the person is logged in
            const { data } = await axios.get(`/getUser/${userId}`); // if so continue
            setUser(data.user);
        } else { // else navigate them to the login page
            navigate("/authentication/login");
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
            });
            navigate("/authentication/login");
        }
    }

    return (
        <Container className={`${c.containerColCenter} p-5`} style={{width: 800}}>
            <Container>
                <label className={`title-left`}>Account Info:
                <hr/>
                </label>
                <label className="subtitle-left" style={{width: "85%"}}>
                    {user.username}
                </label>
                <Button variant="success" style={{width: "15%"}}onClick={logout}>Logout</Button>
            </Container>
            <Container className={""}>
                <AccountSettingsCell/>
                <AccountScoresCell username={user.username}/>
            </Container>
        </Container>
    )
}

export default AccountPage;