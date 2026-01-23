import { Container, Row, Col } from "react-bootstrap";
import logo from "../../../assests/BILogo.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-auto py-3">
      <Container>
        <Row className="align-items-center">
          <Col className="text-start">
            <a
              href="https://buyitshopee.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo}
                alt="BuyIt Logo"
                style={{
                  width: "60px",
                  cursor: "pointer"
                }}
              />
            </a>
          </Col>

          <Col className="text-center d-flex justify-content-center">
            <span className="small text-secondary">
              © {new Date().getFullYear()} BuyIt. All rights reserved.
            </span>
          </Col>

          <Col className="text-end"></Col> {/* extra col used to balance the row */}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
