import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import c from "../classStrings.js";
import { useState } from "react";
import axios from "axios";


function CreateAccountPage() {
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    const createAccount = async (e) => {
        e.preventDefault(); // prevents the form from refreshing page
        const res = await axios.post("/createUser", { username, password }); // sends request to the server to create a user

        if (res.data.success) { // if it successfully created a user
            setShowError(false); // gets rid of the error
            navigate("/authentication/login"); // and navigates to the login page so they can login to their newly created account
        } else { // means there was an error when trying to create the user
            setShowError(true); // makes it show it shows an error message to the user saying what the issue is
            setErrorMsg(res.data.message); // shows the specific message of the error
        }
    };

    return (
        <Container className={c.containerColCenter} style={{width: "50%"}}>
            <Form className={`${c.roundedBorder} p-5`} style={{width: "70%"}} onSubmit={createAccount}>
                <Form.Group>
                    <h2>Create Account</h2>
                    <Form.FloatingLabel label="username" className="my-3">
                        <Form.Control 
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.FloatingLabel>

                    <Form.FloatingLabel label="password" className="my-3">
                        <Form.Control 
                            type="password" 
                            placeholder="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.FloatingLabel>

                    <Button variant="success" type="submit" style={{width: "40%"}}>Create</Button>
                </Form.Group>
                { showError && 
                    <h5 className={c.error}>{errorMsg}</h5>
                }
            </Form>
            <Button 
                variant="outline-success" 
                className="my-3"
                onClick={() => navigate("/authentication/login")}
            >
                Login Here
            </Button>
        </Container>
    )
}

export default CreateAccountPage;