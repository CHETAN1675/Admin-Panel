import { FIREBASE_DB_URL, FIREBASE_API_KEY } from "../firebase";

export async function signInWithEmailPassword(email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });

  const data = await res.json();        // data contains idToken, localId, email, expiresIn, etc.
  return data;
}

export async function getUserRecord(localId) {
  const url = `${FIREBASE_DB_URL}/users/${localId}.json`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
