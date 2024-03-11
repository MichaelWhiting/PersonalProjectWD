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
    const userId = useSelector(state => state.userId); // gets the value of userId in the redux store
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUser = async () => {
        if (userId) { // since this page deals with the account, it checks to see if the user is logged in
            const { data } = await axios.get(`/getUser/${userId}`); // if so continue
            setUser(data.user); // updates the user state variable
        } else { // else navigate them to the login page
            navigate("/authentication/login");
        }
    }

    useEffect(() => { // on the initial render, attempts to get the user object from the DB
        getUser();
    }, [])

    const logout = async () => {
        const { data } = await axios.get("/logout"); // sends a request to the server to log out
        if (data.success) { // if it succeeded and deleted the req.session, we will continue
            dispatch({ // tells the redux store to log out and set userId selector to be null
                type: "LOGOUT"
            });
            navigate("/authentication/login"); // navigates the user back to the login screen
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
                <Button variant="success" style={{width: "15%"}} onClick={logout}>Logout</Button>
            </Container>
            <Container className={""}>
                <AccountSettingsCell/>
                <AccountScoresCell username={user.username}/>
            </Container>
        </Container>
    )
}

export default AccountPage;