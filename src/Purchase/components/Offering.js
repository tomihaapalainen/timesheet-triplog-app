import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useGSC } from "../../store/GlobalStateProvider";
import strings from "./strings";
import "./styles.css";

export default function Offering({ setSelectedOffering, offering }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <Card className="mx-auto my-4">
      <Card.Header className="bg-primary">
        <p style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
          {offering.duration} {strings.months}
        </p>
      </Card.Header>
      <Card.Body className="offering-card-body">
        <p className="mt-1" style={{ fontSize: 17 }}>
          {strings.yourPrice}
        </p>
        {offering.has_discount && (
          <p className="mt-1" style={{ fontSize: 17 }}>
            {(offering.discounted_price / 100).toFixed(2)} €
          </p>
        )}
        <p
          className="mt-1"
          style={
            offering.has_discount
              ? { textDecoration: "line-through", color: "grey", fontSize: 14 }
              : { fontSize: 17, fontWeight: "bold" }
          }
        >
          {(offering.price / 100).toFixed(2)} €
        </p>
        <p className="mt-2" style={{ fontSize: 15 }}>
          {(offering.price_per_month / 100).toFixed(2)} €/{strings.month}
        </p>
      </Card.Body>
      <Card.Footer style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Button onClick={() => setSelectedOffering(offering)}>{strings.choose}</Button>
      </Card.Footer>
    </Card>
  );
}
