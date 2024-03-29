import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

function NavigationBar() {
    return (
        <Navbar expand='md' bg='success' data-bs-theme='dark'>
            <Container fluid className="d-flex">
                <Link to="authentication/login">
                <Navbar.Brand >
                    <Icon.Dice5Fill style={{width: 50, height: 50}}/>
                </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Link className="nav-link" to="hangman">
                            <Icon.HSquareFill style={{width: 30, height: 30, marginRight: 5}}/>
                            Hangman
                        </Link>
                        <Link className="nav-link" to="categories">
                            <Icon.ListOl style={{width: 30, height: 30, marginRight: 5}}/>
                            Categories
                        </Link>
                        <Link className="nav-link" to="scramble">
                            <Icon.Shuffle style={{width: 30, height: 30, marginRight: 5}}/>
                            Scramble
                        </Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Link className="nav-link" to="leaderboards">
                            <Icon.TrophyFill style={{width: 25, height: 25, marginRight: 10}}/>
                            Leaderboards
                        </Link>
                        <Link className="nav-link" to="account">
                            <Icon.PersonCircle style={{width: 25, height: 25, marginRight: 5}}/>
                            Account
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;