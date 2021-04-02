import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import strings from "./components/strings";

export default function SuccessPage() {
  return (
    <Container fluid className="justify-content-center align-items-center">
      <Card style={{ maxWidth: "500px" }}>
        <Card.Header className="bg-primary text-white">
          <Card.Title>{strings.purchaseSuccessful}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Container>
            <p>{strings.thankYouForPurchasing}</p>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}
