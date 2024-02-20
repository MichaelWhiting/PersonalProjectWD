import { Button, Container, Form } from "react-bootstrap";


function AccountEditCell() {
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Form>
                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="text" placeholder="username"/>

                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" placeholder="password"/>

                    <Button variant="primary" type="submit">Change</Button>
                </Form.Group>  
            </Form>
        </Container>
    )
}

export default AccountEditCell;