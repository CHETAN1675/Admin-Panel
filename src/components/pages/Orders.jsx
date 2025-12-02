import { useEffect, useState } from "react";
import { Table, Container, Form } from "react-bootstrap";
import { getAllOrders, updateOrderStatus } from "../../services/orderServices";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    const res = await getAllOrders();
    setOrders(res);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (uid, orderId, status) => {
    await updateOrderStatus(uid, orderId, status);
    fetchOrders(); // 🔄 refresh list after updating
  };

  return (
    <Container className="mt-4">
      <h3>Orders</h3>

      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}

      {!loading && orders.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Total Amount</th>
              <th>Items</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>₹{order.totalAmount}</td>
                <td>{order.items?.length}</td>

               
                <td>
                  <Form.Select
                    value={order.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(order.uid, order.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </td>

                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Orders;
