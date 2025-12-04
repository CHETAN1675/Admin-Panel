import { useEffect, useState } from "react";
import { Table, Container, Form, Button, Badge, Image } from "react-bootstrap";
import { getAllOrders, updateOrderStatus } from "../../services/orderServices";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  async function fetchOrders() {
    const res = await getAllOrders();
    setOrders(res);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSave = async (uid, orderId) => {
    await updateOrderStatus(uid, orderId, newStatus);
    setEditingId(null);
    fetchOrders(); // refresh so client side will reflect updated status
  };

  const badgeColor = (status) => {
    switch (status) {
      case "Pending": return "warning";
      case "Processing": return "info";
      case "Shipped": return "primary";
      case "Delivered": return "success";
      case "Cancelled": return "danger";
      default: return "secondary";
    }
  };

  return (
    <Container  fluid className="mt-4">
      <h3 className="mb-4">Orders</h3>

      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}

      {!loading && orders.length > 0 && (
        <Table bordered hover responsive className="shadow">
          <thead className="bg-primary text-white">
            <tr>
              <th>Status</th>
              <th>Quantity</th>
              <th>Total Sum</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>
                  <Badge bg={badgeColor(order.status)}>{order.status}</Badge>
                </td>

                <td>{order.items?.length}</td>

                <td>₹{order.totalAmount}</td>

                <td>
                  {order.items?.[0]?.image ? (
                    <Image
                      src={order.items[0].image}
                      width={60}
                      height={60}
                      rounded
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>

                <td>
                  {editingId === order.id ? (
                    <div className="d-flex gap-2">
                      <Form.Select
                        size="sm"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        style={{ maxWidth: 160 }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </Form.Select>

                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleSave(order.uid, order.id)}
                      >
                        Save
                      </Button>

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        setEditingId(order.id);
                        setNewStatus(order.status);
                      }}
                    >
                      Change Status
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Orders;
