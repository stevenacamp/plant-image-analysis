import { firebaseAuth, googleProvider } from '../config/config';

export function loginWithGoogle() {
  return firebaseAuth.signInWithRedirect(googleProvider);
}

export function logout() {
  return firebaseAuth.signOut();
}