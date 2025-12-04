import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getAllProducts, getAllOrders, getAllUsers } from "../../services/productServices";

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        const [products, orders, users] = await Promise.all([
          getAllProducts(),
          getAllOrders(),
          getAllUsers(),
        ]);

        setStats({
          products: products.length,
          orders: orders.length,
          users: users,
        });
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <>
      <h3 className="mb-3">Dashboard</h3>

      <p className="text-muted">
        Welcome back {user?.name || user?.email}
      </p>

      {loading && <Spinner animation="border" variant="primary" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Row className="g-3 mt-2">
          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h6>Total Products</h6>
              <h2 className="fw-bold mt-2">{stats.products}</h2>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h6>Total Orders</h6>
              <h2 className="fw-bold mt-2">{stats.orders}</h2>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h6>Total Users</h6>
              <h2 className="fw-bold mt-2">{stats.users}</h2>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
