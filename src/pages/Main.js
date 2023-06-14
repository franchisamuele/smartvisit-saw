import Navbar from '../components/Navbar'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Map from './Map'
import Poi from './Poi'
import Events from './Events'
import Tickets from './Tickets'
import NoPage from './NoPage'

export default function Main() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Map />} />
        <Route path="/pointsOfInterest" element={<Poi />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}