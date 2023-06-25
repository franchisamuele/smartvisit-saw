export default function SearchBar({ search, setSearch }) {
  return (
    <div className="row justify-content-center mt-3">
      <div className="d-flex col-12 col-sm-8 col-md-6 col-xl-4">
        <input
          className="form-control me-2"
          type="search" placeholder="Cerca"
          aria-label="Search" value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}