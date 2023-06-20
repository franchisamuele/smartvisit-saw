import { Link, NavLink } from 'react-router-dom';
import { auth } from '../firebaseConfig'

export default function MobileNavbar() {
  return (
    <nav id="navPhone" className="nav">
      <NavLink className="nav__link" to="/">
        <i className="material-icons nav__icon">map</i>
        <span className="nav__text">Mappa</span>
      </NavLink>
      <NavLink className="nav__link" to="/pointsOfInterest">
        <i className="material-icons nav__icon">location_city</i>
        <span className="nav__text">Luoghi</span>
      </NavLink>
      <NavLink className="nav__link" to="./events">
        <i className="material-icons nav__icon">event</i>
        <span className="nav__text">Eventi</span>
      </NavLink>
      <NavLink className="nav__link" to="./tickets">
        <i className="material-icons nav__icon">local_activity</i>
        <span className="nav__text">Biglietti</span>
      </NavLink>
      <Link className="nav__link" onClick={() => auth.signOut()}>
        <i className="material-icons nav__icon">account_circle</i>
        <span className="nav__text">Logout</span>
      </Link>
    </nav>
  );
}