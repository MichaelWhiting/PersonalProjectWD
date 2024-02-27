import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function AccountEditCell() {
    const [username, setUsername] = useState("");

    const changeUsername = async (e) => {
        e.preventDefault();
        const { data } = await axios.put("/updateUsername", { username });
        
        if (data.success) {
            console.log(data.message);
            setUsername("");
        }
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center border border-success rounded p-5 mx-3"
            style={{height: "80%"}}
            >
            <Form onSubmit={changeUsername}>
                <h3>Edit Username</h3>
                <Form.Group>
                    <Form.FloatingLabel label="username" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Form.Control placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                    </Form.FloatingLabel>

                    {/* <Form.FloatingLabel label="password" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Form.Control placeholder="password"/>
                    </Form.FloatingLabel> */}

                    <Button variant="success" type="submit" style={{marginTop: 10, marginBottom: 10}}>Save</Button>
                </Form.Group>  
            </Form>
        </Container>
    )
}

export default AccountEditCell;