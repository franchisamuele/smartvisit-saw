import { signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig'

export default function LoginPage() {

  function handleLogin() {
    signInWithRedirect(auth, provider);
  }

  return (
    <>
      <a onClick={handleLogin}>Accedi</a>
    </>
  );
}