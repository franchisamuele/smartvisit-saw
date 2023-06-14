import 'bootstrap/dist/css/bootstrap.min.css'
import Search from '../components/Search';
import Poi from '../components/Poi';

export default function Pois() {
  return (
    <div className="container mt-1 mb-3">
      <Search />

      <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
        <Poi />
        <Poi />
        <Poi />
      </div>
    </div>
  );
}