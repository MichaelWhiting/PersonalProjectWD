import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBarComponent() {
    return (
        <Navbar expand='md' bg='primary' data-bs-theme='dark'>
            <Container fluid>
                <Nav.Brand>Games</Nav.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/game1">Games</Link>
                        <Link className="nav-link" to="/leaderboards">Leaderboards</Link>
                        <Link className="nav-link" to="/account">Account</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarComponent;