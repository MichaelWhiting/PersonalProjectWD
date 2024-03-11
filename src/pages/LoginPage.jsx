import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import c from "../classStrings.js";

function LoginPage() {
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents refresh from form

        const res = await axios.post("/login", { username, password }); // attempts to login the user

        if (res.data.success) { // if user is logged in,
            setShowError(false); // clears the error
            dispatch({ // sets the redux userId variable
                type: "USER_AUTH",
                payload: res.data.userId
            });

            setUsername(""); // clears username input
            setPassword(""); // clears password input
        
            navigate("/leaderboards");
        } else { // if did not login, change set
            setShowError(true); // shows the error
            setErrorMsg(res.data.message); // shows what error
            setInterval(() => { // error dissappears after 10 seconds
                setShowError(false); // clears the error
            }, 10000);
        }
    }

    return (
        <Container className={c.containerColCenter} style={{width: "50%"}}>
            <Form className={`${c.roundedBorder} p-5`} style={{width: "70%"}} onSubmit={handleSubmit}>
                <Form.Group>
                    <h2>Login</h2>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.FloatingLabel>

                    <Button 
                        variant="success" 
                        type="submit" 
                        style={{width: "40%"}}
                    >
                    Login
                    </Button>
                </Form.Group>
                { showError && 
                    <h5 className={c.error}>{errorMsg}</h5>
                }
            </Form>
            <Button 
                variant="outline-success" 
                className="my-3" 
                onClick={() => navigate("/authentication/createAccount")}
            >
                Create Account Here
            </Button>
        </Container>
    )
}

export default LoginPage;