import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import strings from "./strings";
import { useGSC } from "../store/GlobalStateProvider";

const CheckoutRedirectPage = () => {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <Container className="my-5">
      <Row>
        <p>{strings.orderFailed}</p>
        <Link to="/checkout">{strings.backToCheckout}</Link>
      </Row>
    </Container>
  );
};

export default CheckoutRedirectPage;
