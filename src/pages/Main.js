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
import InsertPoi from './InsertPoi';
import InsertEvent from './InsertEvent';
import { auth, isAdmin } from '../firebaseConfig'
import { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStateContext } from '../App';
import { Timestamp } from 'firebase/firestore';

export default function Main() {
  const [user, setUser] = useState(null);
  const { globalState, setGlobalState } = useContext(GlobalStateContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user) {
        isAdmin(user.uid)
          .then((result) => setGlobalState({ admin: result }));
      }
    });

    return unsubscribe;
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
        {globalState.admin ? (
          <>
            <Route path="/insertPoi/:poiIndex?" element={<InsertPoi />} />
            <Route path="/insertEvent/:eventIndex?" element={<InsertEvent />} />
          </>
        ) : null}
        {/* SOLO ADMIN */}

        <Route path="/NoPage" element={<NoPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <LoginPage />
  );
}

export function getTodayTimestamp() {
  const midnightDate = new Date(Timestamp.now().seconds * 1000);
  midnightDate.setHours(2, 0, 0);
  const midnightTimestamp = Math.floor(midnightDate.getTime() / 1000);

  return midnightTimestamp;
}