import { firebaseConfig } from "../../firebaseConfig";
import { initializeApp, getApp } from "firebase/app";

export function getFirebaseApp() {
  try {
    return getApp();
  } catch (err) {
    return initializeApp(firebaseConfig);
  }
}
