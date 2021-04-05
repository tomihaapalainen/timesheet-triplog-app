import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import "./styles.css";
import strings from "./strings";

export default function Footer() {
  return (
    <Navbar sticky="bottom" className="py-0 bg-secondary text-dark">
      <Container fluid className="py-2">
        <Row className="d-flex align-items-center w-100 mx-0 px-0">
          <Col sm={12} md={3}>
            <p className="text-center">&copy; Code Fuzz (2021)</p>
            <p className="text-center">asiakaspalvelu@pulikka.fi</p>
          </Col>
          <Col sm={12} md={6}></Col>
          <Col sm={12} md={3}>
            <Link to="/privacy-statement">
              <p className="text-center text-primary">
                {strings.privacyStatement1} {strings.privacyStatement2}
              </p>
            </Link>
            <Link to="/terms">
              <p className="text-center text-primary">
                {strings.terms1} {strings.terms2}
              </p>
            </Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
