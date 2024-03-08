import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import c from "../classStrings.js";

function CreateAccountPage() {
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    const createAccount = async (e) => {
        e.preventDefault();
        const res = await axios.post("/createUser", { username, password });

        if (res.data.success) {
            setShowError(false);
            navigate("/authentication/login");
        } else {
            setShowError(true);
            setErrorMsg(res.data.message);
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
            <Link className="nav-link" to="/authentication/login">
                <Button variant="outline-success" className="my-3">Login Here</Button>
            </Link>
        </Container>
    )
}

export default CreateAccountPage;