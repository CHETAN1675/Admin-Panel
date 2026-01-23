import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import adminLogo from "../../../assests/AdminLogo.png";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand
         as={Link}
         to="/"
         className="d-flex align-items-center gap-2"
        >
         <img
           src={adminLogo}
           alt="BuyIt Admin"
           height="32"
           className="d-inline-block align-top"
         />
           <span className="fw-semibold">Admin Panel</span>
        </Navbar.Brand>
         <Navbar.Toggle />
          <Navbar.Collapse>
           <Nav className="ms-auto" style={{ gap: "10px" }}>

          
            <Nav.Link as={Link} to="/">Home</Nav.Link>

           
            {!user && (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}

      
            {user && (
              <>
                <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/admin/products">Products</Nav.Link>
                <Nav.Link as={Link} to="/admin/orders">Orders</Nav.Link>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
            </Nav>
           </Navbar.Collapse>
       </Container>
    </Navbar>
 );
}
