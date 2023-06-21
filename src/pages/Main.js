import Navbar from '../components/Navbar'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MapPage from './MapPage'
import Pois from './Pois'
import PoiDetail from './PoiDetail'
import Events from './Events'
import Tickets from './Tickets'
import BuyTicket from './BuyTicket'
import NoPage from './NoPage'
import LoginPage from './LoginPage'
import AdminPoi from './AdminPoi';
import AdminEvent from './AdminEvent';
import { auth } from '../firebaseConfig'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';

export default function Main() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return user ? (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/:poiIndex?" element={<MapPage />} />
        <Route path="/pointsOfInterest" element={<Pois />} />
        <Route path="/pointsOfInterest/:poiIndex" element={<PoiDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/buyticket/:ticketType/:index" element={<BuyTicket />} />

        {/* SOLO ADMIN */}
        <Route path="/insertPoi" element={<AdminPoi />} />
        <Route path="/insertEvent" element={<AdminEvent />} />
        {/* SOLO ADMIN */}

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <LoginPage />
  );
}