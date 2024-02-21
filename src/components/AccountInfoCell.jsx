import { Container } from "react-bootstrap";
import AccountEditCell from "./AccountEditCell.jsx";
import AccountScoresCell from "./AccountScoresCell.jsx";

function AccountInfoCell() {
    
    return (
        <Container className="vh-80 rounded" style={{background: "#FAF9F6", width: 800}}>
            <Container className="d-flex vh-80 justify-content-center">
                <h1>Account Info:</h1>
            </Container>
            <Container className="d-flex vh-20 justify-content-center align-items-center">
                <AccountEditCell/>
                <AccountScoresCell/>
            </Container>
        </Container>
    )
}

export default AccountInfoCell;