import { Button, Container, Form } from "react-bootstrap";

function AccountEditCell() {
    return (
        <Container className="d-flex min-vh-50 justify-content-center align-items-center border border-success rounded p-5">
            <Form>
                <Form.Group>
                    <Form.FloatingLabel label="username" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Form.Control placeholder="username"/>
                    </Form.FloatingLabel>

                    <Form.FloatingLabel label="password" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Form.Control placeholder="password"/>
                    </Form.FloatingLabel>

                    <Button variant="success" type="submit" style={{marginTop: 10, marginBottom: 10}}>Change</Button>
                </Form.Group>  
            </Form>
        </Container>
    )
}

export default AccountEditCell;