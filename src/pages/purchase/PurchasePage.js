import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Offerings from "../../components/purchase/Offerings";
import CheckoutPage from "./CheckoutPage";

export default function PurchasePage() {
  const [selectedOffering, setSelectedOffering] = useState(null);

  return (
    <Container>
      {selectedOffering === null && <Offerings setSelectedOffering={setSelectedOffering} />}
      {selectedOffering !== null && <CheckoutPage offering={selectedOffering} />}
    </Container>
  );
}
