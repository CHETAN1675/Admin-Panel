import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h3>Dashboard</h3>
      <Row className="g-3">
        <Col md={4}>
          <Card className="p-3">
            <h5>Products</h5>
            <p>Manage your product catalog</p>
            <Link to="/admin/products">Go to Products</Link>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Orders</h5>
            <p>View customer orders</p>
            <Link to="/admin/orders">Go to Orders</Link>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Settings</h5>
            <p>Admin settings and users</p>
          </Card>
        </Col>
      </Row>
    </>
  );
}
