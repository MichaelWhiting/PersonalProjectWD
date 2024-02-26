import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Components 
import CreateAccountPage from "./CreateAccountPage.jsx";

function LoginPage() {
    const userId = useSelector(state => state.userId);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/login", { username, password });

        if (res.data.success) {
            dispatch({
                type: "USER_AUTH",
                payload: res.data.userId
            });

            setUsername("");
            setPassword("");
        
            navigate("/leaderboards");
        }
        
    }

    const sessionCheck = async () => {
        const res = await axios.get("/session-check")
    
        if (res.data.success) {
          dispatch({
            type: "USER_AUTH",
            payload: res.data.userId
          })
        }
      }

    return (
    <Container
            className="d-flex flex-column justify-content-center align-items-center"
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
            </Form>
            <Button variant="outline-success" style={{margin: 10}}>
                <Link className="nav-link" to="/logincreate/createAccount">Create Account Here</Link>
            </Button>
        </Container>
    )
}

export default LoginPage;