import { FIREBASE_DB_URL } from "../firebase";

export async function getAllProducts() {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/products.json`);
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


export async function addProduct(product, token) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/products.json?auth=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) return { success: false, message: "Failed to add product" };
    return { success: true };
  } catch {
    return { success: false, message: "Network error" };
  }
}


export async function updateProduct(id, updates, token) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/products/${id}.json?auth=${token}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) return { success: false, message: "Failed to update product" };
    return { success: true };
  } catch {
    return { success: false, message: "Network error" };
  }
}


export async function deleteProduct(id, token) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/products/${id}.json?auth=${token}`, {
      method: "DELETE",
    });
    return res.ok ? { success: true } : { success: false };
  } catch {
    return { success: false };
  }
}


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
    return { error: true };
  }
}
