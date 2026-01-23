import { FIREBASE_DB_URL } from "../firebase";



// Get all products
export async function getAllProducts() {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/products.json`);
    const data = await res.json();
    if (!data) return [];
    
    return Object.keys(data).map(id => ({
      id,
      ...data[id],
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Add product
export async function addProduct(product, token) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/products.json?auth=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.error || "Failed to add product" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, message: "Network error" };
  }
}

// Update product
export async function updateProduct(id, updates, token) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/products/${id}.json?auth=${token}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.error || "Failed to update product" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, message: "Network error" };
  }
}

// Delete product
export async function deleteProduct(id, token) {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/products/${id}.json?auth=${token}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false };
  }
}
// User's in Firebase DB
export async function getAllUsers() {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/users.json`);
    const data = await res.json();
    if (!data) return 0;
    return Object.keys(data).length; // count total users
  } catch {
    return 0;
  }
}