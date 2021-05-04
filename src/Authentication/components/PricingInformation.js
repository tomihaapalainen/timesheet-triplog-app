import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import strings from "./strings";
import "./styles.css";

export default function PricingInformation() {
  return (
    <Container className="mt-5 pb-5">
      <Container>
        <Container fluid>
          <h2 className="text-center pb-2 pricing-header">{strings.pricing}</h2>
          <p className="pb-4">{strings.pricingInfo}</p>
        </Container>
        <Row>
          <Col className="mb-4 justify-content-center align-items-center" sm={12} md={6}>
            <Card>
              <Card.Header className="bg-primary text-white pricing-header">
                {strings.threeMonths}
              </Card.Header>
              <Card.Body>
                <p className="pricing-body text-center">{strings.threeMonthPrice}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-4 justify-content-center align-items-center" sm={12} md={6}>
            <Card>
              <Card.Header className="bg-primary text-white pricing-header">
                {strings.twelveMonths}
              </Card.Header>
              <Card.Body>
                <p className="pricing-body text-center">{strings.twelveMonthPrice}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
