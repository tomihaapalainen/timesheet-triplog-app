import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Offerings from "./components/Offerings";
import strings from "./components/strings";

export default function PurchasePage() {
  const [selectedOffering, setSelectedOffering] = useState(null);

  return (
    <Container>
      {selectedOffering === null && <Offerings setSelectedOffering={setSelectedOffering} />}
      {selectedOffering !== null && (
        <Container fluid className="py-5 justify-content-center align-items-center">
          <p>{strings.unavailable}</p>
        </Container>
      )}
    </Container>
  );
}
