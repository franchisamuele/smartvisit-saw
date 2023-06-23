import { Link } from "react-router-dom";

export default function ModifyDelete({ id, deletePoi }) {
  return (
    <>
      <Link className="btn btn-warning mb-1" to={"/insertPoi/" + id} role="button">Modifica Poi</Link>{' '}
      <button className="btn btn-danger mb-1" onClick={deletePoi}>Elimina Poi</button>
    </>
  );
}