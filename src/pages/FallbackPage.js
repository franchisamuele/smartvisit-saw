import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.onLine)
      navigate('/');
  }, [navigator.onLine]);

  return (
    <div className="container mt-1 mb-3">
      <div className="row justify-content-center mt-3">
        <h1>Sei offline!</h1>
        <p>Torna online per caricare questa pagina</p>
      </div>
    </div>
  );
}