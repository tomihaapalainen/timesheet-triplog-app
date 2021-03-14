import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import "./styles.css";

export default function Footer() {
  return (
    <Navbar sticky="bottom" className="py-0 bg-secondary text-black">
      <Container fluid className="py-2">
        <Row className="d-flex justify-content- align-items-center w-100 mx-0 px-0">
          <Col sm={12} md={4}>
            <p className="text-center">&copy; Code Fuzz (2021)</p>
          </Col>
          <Col sm={12} md={4}>
            <p className="text-center">asiakaspalvelu@pulikka.fi</p>
          </Col>
          <Col sm={12} md={4}>
            <Link to="/terms">
              <p className="text-center">Sopimusehdot</p>
            </Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
