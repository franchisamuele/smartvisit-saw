import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, NavLink } from 'react-router-dom';

export default function DesktopNavbar() {
  return (
    <nav id="navDesktop" className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" exact to="/">Bologna</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">Mappa</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pointsOfInterest">Punti di interesse</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="./events">Eventi</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="./tickets">Biglietti</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li><NavLink className="nav-link" to="TODO">Logout</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}