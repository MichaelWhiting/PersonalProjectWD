import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <Container
            className="d-flex flex-column justify-content-center align-items-center"
            style={{  width: "50%", }}
        >
            <Form className="my-auto border border-success rounded p-5" style={{width: "70%", background: "#FAF9F6"}}>
                <Form.Group>
                    <h2>Login</h2>
                    <Form.FloatingLabel label="username" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Form.Control placeholder="username"/>
                    </Form.FloatingLabel>

                    <Form.FloatingLabel label="password" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Form.Control type="password" placeholder="password"/>
                    </Form.FloatingLabel>

                    <Button variant="success" type="submit" className="mx-auto" style={{width: "40%", overflowWrap: "unset"}}>Login</Button>
                </Form.Group>
            </Form>
            <Button variant="outline-success" style={{margin: 10}}>
                <Link className="nav-link" to="/createAccount">Create Account Here</Link>
            </Button>
        </Container>
    )
}

export default LoginPage;