const FIREBASE_DB = "https://buyite-comm-default-rtdb.firebaseio.com";

export async function getAllProducts() {
  try {
    const res = await fetch(`${FIREBASE_DB}/products.json`);
    const data = await res.json();

    if (!data) return [];

    return Object.keys(data).map(id => ({
      id,
      ...data[id],
    }));
  } catch {
    return { error: true };
  }
}
