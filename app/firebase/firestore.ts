import { getFirebaseApp } from "./util";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const userCollectionRef = collection(getDb(), "users");

interface user {
  firstName: string;
  lastName: string;
}

function getDb() {
  const app = getFirebaseApp();
  const db = getFirestore(app);
  return db;
}

export async function getUsers() {
  try {
    const usersSnapshot = await getDocs(userCollectionRef);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
  } catch (err) {
    console.error("Error calling getUsers: ", err);
  }
}

export async function addUser(payload: user) {
  try {
    const docRef = await addDoc(userCollectionRef, payload);
    return docRef;
  } catch (err) {
    console.error(err);
  }
}
