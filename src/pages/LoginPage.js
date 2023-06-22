import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig'
import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import LoginCarousel from '../components/LoginCarousel';
import { GoogleButton } from 'react-google-button'

export default function LoginPage() {
  const [isLogged, setIsLogged] = useState(false);

  function handleLogin() {
    signInWithPopup(auth, provider)
      .catch(() => {
        setIsLogged(false);
        window.alert("Errore in fase di autenticazione!");
      });
    setIsLogged(true);
  }

  return <>
  <div className="min-vh-100 align-items-center">

    {isLogged && <LoadingSpinner />}
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