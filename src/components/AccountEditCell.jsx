import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function AccountEditCell() {
    const [username, setUsername] = useState("");
    const [showSure, setShowSure] = useState(false);
    const changeUsername = async (e) => {
        e.preventDefault();
        const { data } = await axios.put("/updateUsername", { username });
        
        if (data.success) {
            console.log(data.message);
        }
        setUsername("");
    }

    const deleteAccount = async (e) => {
        e.preventDefault();
        // delete user

        // logout
    }

    return (
        <Container 
            className=" border border-success rounded p-5 mx-3"
            style={{height: "90%"}}
            >
            <Form onSubmit={changeUsername}>
                <h4>Edit Username</h4>
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
            <Form onSubmit={deleteAccount} style={{marginTop: "5%"}}>
                <h4>Delete Account</h4>
                <Button 
                    variant={showSure ? "warning": "danger"}
                    onClick={() => setShowSure(!showSure)}
                    style={{marginTop: 10, marginBottom: 10}}
                    >
                    { showSure ? "Cancel" : "Delete Account"}
                </Button>
                { showSure && 
                    <div className="fade-in">
                        <h6>Are you sure you want to delete your account?</h6>
                        <Button variant="danger" type="submit">I'm Sure</Button>
                    </div>
                }
            </Form>
        </Container>
    )
}

export default AccountEditCell;