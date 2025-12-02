import { FIREBASE_DB_URL } from "../firebase";

export async function getAllOrders() {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/orders.json`);
    const data = await res.json();

    console.log("RAW ADMIN ORDERS:", data);

    if (!data) return [];

    const allOrders = [];

    // Loop through each user
    Object.entries(data).forEach(([uid, userOrders]) => {
      // Loop through each order of the user
      Object.entries(userOrders).forEach(([orderId, order]) => {
        allOrders.push({
          id: orderId,
          uid,
          ...order,
          items: order.items || [],
        });
      });
    });

    return allOrders;

  } catch (err) {
    console.error("ADMIN ORDER FETCH ERROR:", err);
    return [];
  }
}


export async function updateOrderStatus(uid, orderId, status) {
  const res = await fetch(
    `${FIREBASE_DB_URL}/orders/${uid}/${orderId}.json`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    }
  );

  return res.json();
}
