import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { loadStripe } from "@stripe/stripe-js";
import { FaArrowLeft } from "react-icons/fa";
import { useGSC } from "../../store/GlobalStateProvider";
import strings from "./strings";
import { baseUrl } from "../../config";
import { useAuth } from "../../contexts/AuthContext";

const stripePromise = loadStripe(
  "pk_test_51IX4o7HmRBOzJv0KL0clVyTOefbelOSU7c0UkupDAGPZeC2un9LJkdPn2aSEZ5ey0TghS8MKY0Rr9idazzc3z8po006QlBtwhr"
);

export default function Checkout({ offering, setOffering }) {
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useAuth();
  const { language } = useGSC();
  strings.setLanguage(language);

  const calculateDiscountedPrice = (o) => {
    let price = ((o.price / 100 - o.referred_user_count) * (100 - o.discount)) / 100;
    return price.toFixed(2);
  };

  const getBillingInfo = (duration) => {
    return duration === 3 ? strings.threeMonthInfo : strings.annualInfo;
  };

  const startCheckout = async (event) => {
    const stripe = await stripePromise;

    let idToken = await currentUser.getIdToken(true);
    const response = await axios.post(
      `${baseUrl}/create-checkout-session`,
      { duration: offering.duration, language: language },
      {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    );

    console.log(response);

    const result = await stripe.redirectToCheckout({ sessionId: response.data.id });

    console.log(result);

    if (result.error) {
      setErrorMessage(result.error.message);
    }
  };

  return (
    <Container>
      <Button className="bg-light mt-3" onClick={() => setOffering(null)}>
        <FaArrowLeft className="text-primary pointer" size={30} />
      </Button>
      {errorMessage && (
        <Container>
          <p className="lead text-error">
            {strings.errorCheckingOut}: {errorMessage}
          </p>
        </Container>
      )}
      <Card className="mx-auto my-4" style={{ maxWidth: "600px" }}>
        <Card.Header className="bg-primary">
          <p style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
            {offering.duration} {strings.months}
          </p>
        </Card.Header>
        <Card.Body>
          <Container className="d-flex flex-column justify-content-center align-items-start">
            <p className="my-1">
              {strings.yourPrice} {calculateDiscountedPrice(offering)} €
            </p>
            <p className="my-1">{getBillingInfo(offering.duration)}</p>
          </Container>
        </Card.Body>
        <Card.Footer style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Button onClick={startCheckout}>{strings.purchase}</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
