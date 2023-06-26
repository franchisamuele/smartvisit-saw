import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig'
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import LoginCarousel from '../components/LoginCarousel';
import { GoogleButton } from 'react-google-button'

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    signInWithPopup(auth, provider)
      .catch(() => {
        setLoading(false);
        window.alert("Errore in fase di autenticazione!");
      });
    setLoading(true);
  }

  useEffect(() => {
    const html = document.querySelector('html');
    html.style.paddingBottom = 0;

    return () => html.style.paddingBottom = "56px";
  }, []);

  return <>
  <div className="min-vh-100 align-items-center">

    {loading && <LoadingSpinner />}
    <div>
      <div className="login-form text-center">
        <h1 className="font-weight-light text-uppercase">Smart Visit Pisa</h1>
        <p className="mb-4">Accedi per visualizzare i contenuti</p>

        <GoogleButton onClick={handleLogin} className="m-auto" />
      </div>
    </div>

    <LoginCarousel />

  </div>
  </>
}