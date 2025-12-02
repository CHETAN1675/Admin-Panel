import { FIREBASE_DB_URL } from "../firebase";

export async function getAllOrders() {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/orders.json`);
    const data = await res.json();

    if (!data) return [];
    return Object.keys(data).map(id => ({
      id,
      ...data[id],
    }));
  } catch {
    return [];
  }
}
