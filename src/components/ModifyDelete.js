import { Link } from "react-router-dom";

export default function ModifyDelete({ id, deletePoi }) {
  return (
    <>
      <Link className="btn btn-warning mb-1" to={"/insertPoi/" + id} role="button">Modifica Poi</Link>{' '}
      <a className="btn btn-danger mb-1" href="#" onClick={deletePoi} role="button">Elimina Poi</a>
    </>
  );
}