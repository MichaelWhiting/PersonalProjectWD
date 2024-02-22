import { Button, Container, Form } from "react-bootstrap";

function AccountEditCell() {
    return (
        <Container className="d-flex min-vh-50 justify-content-center align-items-center rounded" style={{background: "#AEC6CF"}}>
            <Form>
                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="text" placeholder="username"/>

                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" placeholder="password"/>

                    <Button variant="primary" type="submit" style={{marginTop: 10, marginBottom: 10}}>Change</Button>
                </Form.Group>  
            </Form>
        </Container>
    )
}

export default AccountEditCell;