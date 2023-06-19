import Ticket from '../components/Ticket';

export default function Tickets() {
  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-1 text-center">I MIEI BIGLIETTI</h1>
      <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
        <Ticket />
        <Ticket />
        <Ticket />
      </div>
    </div>
  );
}