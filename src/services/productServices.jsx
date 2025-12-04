import { FIREBASE_DB_URL } from "../firebase";

// Get all orders
export async function getAllOrders() {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/orders.json`);
    const data = await res.json();

    if (!data) return [];
    
    return Object.entries(data).flatMap(([uid, userOrders]) =>
      Object.entries(userOrders).map(([orderId, order]) => ({
        id: orderId,
        uid,
        name: order.name || "Unknown",
        email: order.email || "Unknown",
        items: order.items || [],
        totalAmount: order.total || 0,
        status: order.status || "Pending",
        date: order.createdAt || "Unknown",
      }))
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

// Update order status
export async function updateOrderStatus(uid, orderId, status) {
  try {
    const res = await fetch(
      `${FIREBASE_DB_URL}/orders/${uid}/${orderId}.json`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      }
    );
    if (!res.ok) throw new Error("Failed to update order");
    return res.json();
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, message: error.message };
  }
}

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