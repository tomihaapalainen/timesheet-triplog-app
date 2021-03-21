import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Offerings from "./components/Offerings";
import Checkout from "./components/Checkout";

export default function PurchasePage() {
  const [selectedOffering, setSelectedOffering] = useState(null);

  return (
    <Container>
      {selectedOffering === null && <Offerings setSelectedOffering={setSelectedOffering} />}
      {selectedOffering !== null && (
        <Checkout offering={selectedOffering} setOffering={setSelectedOffering} />
      )}
    </Container>
  );
}
