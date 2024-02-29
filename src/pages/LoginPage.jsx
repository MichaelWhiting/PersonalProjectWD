import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
        console.log(res.data.message);

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
        <Container
            className="d-flex flex-column justify-content-center align-items-center mt-5 fade-in"
            style={{  width: "50%", }}
            >
            <Form 
                className="my-auto border border-success rounded p-5" 
                style={{width: "70%", background: "#FAF9F6"}}
                onSubmit={handleSubmit}
                >
                <Form.Group>
                    <h2>Login</h2>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.FloatingLabel>

                    <Button 
                        variant="success" 
                        type="submit" 
                        className="mx-auto" 
                        style={{width: "40%", overflowWrap: "unset"}}
                    >
                    Login
                    </Button>
                </Form.Group>
                { showError && 
                    <h5 className="mt-5 fade-in-slow" style={{textAlign: "center", color: "red"}}>{errorMsg}</h5>
                }
            </Form>
            <Link className="nav-link" to="/authentication/createAccount">
                <Button variant="outline-success" style={{margin: 10}}>Create Account Here</Button>
            </Link>
        </Container>
    )
}

export default LoginPage;