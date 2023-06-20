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
        <form className="login-form text-center" method="POST">
          <h1 className="font-weight-light text-uppercase">Smart Visit Bologna</h1>
          <p className="mb-4">Accedi per visualizzare i contenuti</p>
          
          <button onClick={handleLogin} type="submit" className="btn mt-4 rounded-pill btn-primary text-uppercase btn-custom">Accedi con Google</button>
        </form>
      </div>
      </div>
    </>
  );
}