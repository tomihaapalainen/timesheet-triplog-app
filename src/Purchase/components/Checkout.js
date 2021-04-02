import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Loading from "../../shared/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { FaArrowLeft } from "react-icons/fa";
import { useGSC } from "../../store/GlobalStateProvider";
import strings from "./strings";
import { baseUrl, stripeApiKey } from "../../config";
import { useAuth } from "../../contexts/AuthContext";

const stripePromise = loadStripe(stripeApiKey);

export default function Checkout({ offering, setOffering }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useAuth();
  const { language } = useGSC();

  strings.setLanguage(language);

  const getPrice = (o) => {
    let price = o.discounted_price / 100;
    return price.toFixed(2);
  };

  const startCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    let idToken = await currentUser.getIdToken(true);
    const response = await axios.post(
      `${baseUrl}/purchases/create-checkout-session`,
      { duration: offering.duration, language: language },
      {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    );

    const result = await stripe.redirectToCheckout({ sessionId: response.data.id });

    if (result.error) {
      setErrorMessage(result.error.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      {errorMessage && (
        <Container>
          <p className="lead text-error">
            {strings.errorCheckingOut}: {errorMessage}
          </p>
        </Container>
      )}
      <Card className="mx-auto my-4" style={{ maxWidth: "600px" }}>
        <Card.Header className="bg-primary">
          <Row>
            <Col xs={2}>
              <Button className="border-light" onClick={() => setOffering(null)}>
                <FaArrowLeft className="pointer" size={30} />
              </Button>
            </Col>
            <Col xs={10} className="d-flex align-items-center justify-content-start">
              <p className="offering-title">
                {offering.duration} {strings.months}
              </p>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Container className="d-flex flex-column justify-content-center align-items-start">
            <p className="my-1">
              {strings.yourPrice} <strong>{getPrice(offering)} €</strong>
            </p>
            <p className="my-1">{strings.purchaseInfo}</p>
          </Container>
        </Card.Body>
        <Card.Footer
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "80px",
          }}
        >
          {loading && <Loading />}
          {!loading && <Button onClick={startCheckout}>{strings.moveToCheckout}</Button>}
        </Card.Footer>
      </Card>
    </Container>
  );
}
