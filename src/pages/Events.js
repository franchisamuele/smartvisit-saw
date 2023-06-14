import 'bootstrap/dist/css/bootstrap.min.css'
import Event from '../components/Event';
import Search from '../components/Search';

export default function Events() {
  return (
    <div className="container mt-1 mb-3">
        <Search />

        <div className="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-xl-3">
          <Event />
          <Event />
          <Event />
        </div>
    </div>
  );
}