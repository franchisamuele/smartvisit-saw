import Navbar from '../components/Navbar'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Map from './Map'
import Pois from './Pois'
import PoiDetail from './PoiDetail'
import Events from './Events'
import Tickets from './Tickets'
import BuyTicket from './BuyTicket'
import NoPage from './NoPage'

export default function Main() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Map />} />
        <Route path="/pointsOfInterest" element={<Pois />} />
        <Route path="/pointsOfInterest/:poiIndex" element={<PoiDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/buyticket/:index" element={<BuyTicket />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}