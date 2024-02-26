import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

function NavigationBar() {
    return (
        <Navbar expand='md' bg='success' data-bs-theme='dark'>
            <Container fluid className="d-flex">
                <Navbar.Brand href="/logincreate/login">
                    <Icon.Dice5Fill style={{width: 50, height: 50}}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/game1">
                        <Icon.HSquareFill style={{width: 30, height: 30, marginRight: 5}}/>
                            Hangman
                        </Link>
                        <Link className="nav-link" to="/leaderboards">
                            <Icon.TrophyFill style={{width: 25, height: 25, marginRight: 10}}/>
                            Leaderboards
                        </Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Link className="nav-link" to="/account">
                            <Icon.PersonCircle style={{width: 30, height: 30, marginRight: 5}}/>
                            Account
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;