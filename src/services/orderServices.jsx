import { FIREBASE_DB_URL } from "../firebase";

export async function getAllOrders() {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/orders.json`);
    const data = await res.json();

    if (!data) return [];

    const allOrders = [];

    Object.entries(data).forEach(([uid, userOrders]) => {
      Object.entries(userOrders).forEach(([orderId, order]) => {
        allOrders.push({
          id: orderId,
          uid,
          name: order.name || "Unknown",      // add customer name if saved
          email: order.email || "Unknown",    // add customer email if saved
          items: order.items || [],
          totalAmount: order.total || 0,      // rename total → totalAmount
          status: order.status || "Pending",
          date: order.createdAt || "Unknown"
        });
      });
    });

    return allOrders;
  } catch {
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