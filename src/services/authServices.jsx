import { FIREBASE_DB_URL, FIREBASE_API_KEY } from "../firebase";

// LOGIN
export async function signInWithEmailPassword(email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });

  return await res.json();
}

// SIGNUP (creates user in Firebase Auth)
export async function signUpWithEmailPassword(email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });

  return await res.json();
}

// GET PROFILE FROM DATABASE
export async function getUserRecord(localId) {
  const url = `${FIREBASE_DB_URL}/users/${localId}.json`;
  const res = await fetch(url);
  return await res.json();
}
