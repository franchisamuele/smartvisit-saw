import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function DesktopNavbar() {
  return (
    <Navbar id="navDesktop" bg="primary" variant="dark">
      <Container>
        <Link className="navbar-brand" to="/">Bologna</Link>
        <Nav className="me-auto">
          <NavLink className="nav-link" to="/">Mappa</NavLink>
          <NavLink className="nav-link" to="/pointsOfInterest">Punti di interesse</NavLink>
          <NavLink className="nav-link" to="./events">Eventi</NavLink>
          <NavLink className="nav-link" to="./tickets">Biglietti</NavLink>
        </Nav>
        <Nav>
          <NavLink className="nav-link justify-content-end" to="TODO">Logout</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}