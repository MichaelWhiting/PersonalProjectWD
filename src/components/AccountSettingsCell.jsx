import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

function AccountSettingsCell() {
    const userId = useSelector(state => state.userId); // the userId stored in the redux store, used to make sure logged in
    const [username, setUsername] = useState("");
    const [showSure, setShowSure] = useState(false);
    const dispatch = useDispatch();

    const changeUsername = async (e) => {
        e.preventDefault(); // prevents the form from refreshing page
        const { data } = await axios.put("/updateUsername", { username }); // sends request to server to update username

        if (data.success) { // if it succeeds in changing the username
            setUsername(""); // sets the state variable back to blank
        }
    }

    const deleteAccount = async (e) => {
        e.preventDefault(); // prevents form from refreshing page
 
        if (userId) { // means someone is logged in
            const res = await axios.delete(`/deleteUser/${userId}`); // sends request to server to delete the user object
            console.log(res.message);

            dispatch({ // this should change userId to null and take them back to login screen
                type: "LOGOUT" // this here is telling the redux store to run the LOGOUT action which sets userId to null
            });
        }
    }

    return (
        <Container style={{ height: "90%", background: "#FFFFFF" }}>
            <hr/>
            <Form className="d-flex align-items-center" onSubmit={changeUsername}>
                <label className="subtitle-left" style={{width: "50%"}}>Edit Username</label>
                <Form.FloatingLabel className="me-4" label="username" style={{width: "35%"}}>
                    <Form.Control placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                </Form.FloatingLabel>
                <Button style={{width: "15%"}} variant="success" type="submit">Save</Button>
            </Form>
            <hr/>
            <Form onSubmit={deleteAccount} style={{marginTop: "5%"}}>
                <label className="subtitle-left" style={{width: "78%"}}>Delete Account</label>
                <Button
                    variant={showSure ? "warning" : "danger"}
                    onClick={() => setShowSure(!showSure)}
                    style={{marginTop: 10, marginBottom: 10, width: "22%"}}
                >
                    {showSure ? "Cancel" : "Delete Account"}
                </Button>
                {showSure &&
                    <div className="d-flex flex-column justify-content-center align-items-center fade-in">
                        <h6 style={{ textAlign: "right" }}>Are you sure you want to delete your account?</h6>
                        <span style={{ width: "85%" }}></span>
                        <Button variant="danger" type="submit">I'm Sure</Button>
                    </div>
                }
            </Form>
            <hr/>
        </Container>
    )
}

export default AccountSettingsCell;