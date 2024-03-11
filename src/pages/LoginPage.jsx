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
        e.preventDefault();

        const res = await axios.post("/login", { username, password });

        if (res.data.success) {
            setShowError(false);
            dispatch({
                type: "USER_AUTH",
                payload: res.data.userId
            });

            setUsername("");
            setPassword("");
        
            navigate("/leaderboards");
        } else { // if did not login, change set
            setShowError(true);
            setErrorMsg(res.data.message);
            setInterval(() => {
                setShowError(false);
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