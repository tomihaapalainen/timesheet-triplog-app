import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import strings from "./components/strings";

export default function SuccessPage() {
  return (
    <Container fluid className="mt-5 mx-auto mw-1024">
      <Card style={{ maxWidth: "500px" }}>
        <Card.Header className="bg-primary text-white">
          <Card.Title>{strings.purchaseSuccessful}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Container>
            <p className="my-2">{strings.thankYouForPurchasing}</p>
            <p className="my-2">{strings.welcomeBack}</p>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}
