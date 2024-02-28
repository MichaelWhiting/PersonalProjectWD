import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CreateAccountPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const createAccount = async () => {
        await axios.post("/createUser", { username, password });
        navigate("/authentication/login");
    };

    return (
        <Container
            className="d-flex flex-column justify-content-center align-items-center mt-5 fade-in"
            style={{  width: "50%", }}
            >
            <Form className="my-auto border border-success rounded p-5" style={{width: "70%", background: "#FAF9F6"}}>
                <Form.Group>
                    <h2>Create Account</h2>
                    <Form.FloatingLabel label="username" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Form.Control 
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.FloatingLabel>

                    <Form.FloatingLabel label="password" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Form.Control 
                            type="password" 
                            placeholder="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.FloatingLabel>

                    <Button 
                        variant="success" 
                        type="submit" 
                        className="mx-auto" 
                        style={{width: "40%", overflowWrap: "unset"}}
                        onClick={() => {createAccount()}}
                        >
                        Create
                    </Button>
                </Form.Group>
            </Form>
            <Link className="nav-link" to="/authentication/login">
                <Button variant="outline-success" style={{margin: 10}}>Login Here</Button>
            </Link>
        </Container>
    )
}

export default CreateAccountPage;