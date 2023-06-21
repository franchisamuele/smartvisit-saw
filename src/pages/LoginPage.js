import { signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig'

export default function LoginPage() {

  function handleLogin() {
    signInWithRedirect(auth, provider);
  }

  return (
    <>
      <div id="login-page">
      <div className="d-flex justify-content-center align-items-center login-container">
        <div className="login-form text-center">
          <h1 className="font-weight-light text-uppercase">Smart Visit Pisa</h1>
          <p className="mb-4">Accedi per visualizzare i contenuti</p>
          
          <button onClick={handleLogin} type="submit" className="btn mt-4 rounded-pill btn-primary text-uppercase btn-custom">Accedi con Google</button>
        </div>
      </div>
      </div>
    </>
  );
}