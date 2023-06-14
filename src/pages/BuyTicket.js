import 'bootstrap/dist/css/bootstrap.min.css'
import PoiTicket from '../components/PoiTicket'
import EventTicket from '../components/EventTicket'
import { useParams } from 'react-router-dom';

export default function BuyTicket() {
  const { index } = useParams();

  // IF INDEX POI OR EVENT
  return false ? <PoiTicket /> : <EventTicket />
}