import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useGSC } from "../../store/GlobalStateProvider";
import strings from "./strings";
import "./styles.css";

export default function Offering({ setSelectedOffering, offering }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const calculatePrice = (o) => {
    let price = o.price / 100;
    return price.toFixed(2);
  };

  const calculateDiscountedPrice = (o) => {
    let price = ((o.price / 100 - o.referred_user_count) * (100 - o.discount)) / 100;
    return price.toFixed(2);
  };

  const calculateDiscountedPricePerMonth = (o) => {
    let price = ((o.price / 100 - o.referred_user_count) * (100 - o.discount)) / 100;
    price = price / o.duration;
    return price.toFixed(2);
  };

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
        <p
          className="mt-1"
          style={
            offering.discount || offering.referred_user_count
              ? { textDecoration: "line-through" }
              : { fontSize: 17 }
          }
        >
          {calculatePrice(offering)} €
        </p>
        {(offering.discount > 0 || offering.referred_user_count > 0) && (
          <p className="mt-1" style={{ fontSize: 17 }}>
            {calculateDiscountedPrice(offering)} €
          </p>
        )}
        <p className="mt-1" style={{ fontSize: 15 }}>
          {calculateDiscountedPricePerMonth(offering)} €/{strings.month}
        </p>
      </Card.Body>
      <Card.Footer style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Button onClick={() => setSelectedOffering(offering)}>{strings.choose}</Button>
      </Card.Footer>
    </Card>
  );
}
