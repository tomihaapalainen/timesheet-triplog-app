import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../styles.css";
import strings from "../strings";

export default function Pricing({ language }) {
  strings.setLanguage(language);
  const history = useHistory();

  return (
    <Container id="pricing" fluid className="mw-1024 pricing-page my-5">
      <Row className="pb-3">
        <Container className="center-flex flex-column">
          <h2 className="pricing-title py-5">{strings.pricing}</h2>
          <p>{strings.pricingInfo}</p>
        </Container>
      </Row>
      <Row className="w-100">
        <Col xs={12} md={4} className="my-4 px-3">
          <Card className="h-100">
            <Card.Header className="bg-primary text-white center-flex">
              <Card.Title className="bg-primary border-0 font-weight-bold card-header">
                {strings.free}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text className="card-text">{strings.freeTrial}</Card.Text>
            </Card.Body>
            <Card.Footer className="border-0 bg-white center-flex">
              <Button
                onClick={() => history.push("/register")}
                className="bg-success font-weight-bold text-uppercase border-success w-50 free-trial-btn"
              >
                {strings.start}
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col xs={12} md={4} className="my-4">
          <Card className="h-100">
            <Card.Header className="bg-primary text-white center-flex">
              <Card.Title className="bg-primary border-0 font-weight-bold card-header">
                {strings.threeMonthPrice}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text className="card-text">{strings.threeMonths}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4} className="my-4">
          <Card className="h-100">
            <Card.Header className="bg-primary text-white center-flex">
              <Card.Title className="bg-primary border-0 font-weight-bold card-header">
                {strings.twelveMonthPrice}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text className="card-text">{strings.twelveMonths}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <p className="text-primary">{strings.pricesIncludeVAT}</p>
        </Col>
      </Row>
    </Container>
  );
}
