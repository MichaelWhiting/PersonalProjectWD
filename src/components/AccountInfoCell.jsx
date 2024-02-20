import { Container } from "react-bootstrap";
import AccountEditCell from "./AccountEditCell.jsx";
import AccountScoresCell from "./AccountScoresCell.jsx";

function AccountInfoCell() {
    
    return (
        <Container className="min-vh-100 d-flex" style={{background: "green"}}>
            <h1>Account Info:</h1>
            <Container className="d-flex vh-20 justify-content-center align-items-center" style={{background: "red"}}>
                <AccountEditCell/>
                <AccountScoresCell/>
            </Container>
        </Container>
    )
}

export default AccountInfoCell;