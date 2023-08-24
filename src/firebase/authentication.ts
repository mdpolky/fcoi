import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { getFirebaseApp } from "./util";

export async function authWithYahoo() {
  const app = getFirebaseApp();
  const auth = getAuth(app);
  const provider = new OAuthProvider("yahoo.com");
  try {
    const authResult = await signInWithPopup(auth, provider);
    const credential = OAuthProvider.credentialFromResult(authResult);
    return { yahooUser: authResult, accessToken: credential?.accessToken };
  } catch (err) {
    console.error(err);
  }
}
