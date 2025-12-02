import { Card, Row, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <h3 className="mb-3">Dashboard</h3>
      <p className="text-muted">
        Welcome back {user?.name || user?.email}
      </p>

      <Row className="g-3 mt-2">
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Total Products</h6>
            <h2 className="fw-bold mt-2">0</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Total Orders</h6>
            <h2 className="fw-bold mt-2">0</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6>Total Users</h6>
            <h2 className="fw-bold mt-2">0</h2>
          </Card>
        </Col>
      </Row>
    </>
  );
}
