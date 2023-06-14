import 'bootstrap/dist/css/bootstrap.min.css'

export default function Search() {
  return (
    <div className="row justify-content-center mt-3">
      <form className="d-flex col-12 col-sm-8 col-md-6 col-xl-5" method="POST">
        <input className="form-control me-2" type="search" name="search" value="CAZZCERCO" />
        <button className="btn btn-outline-primary" type="submit" name="submit">Cerca</button>
      </form>
    </div>
  );
}