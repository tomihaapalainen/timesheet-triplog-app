import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";
import "./styles.css";

export default function TryForFree() {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <Container>
      <Jumbotron className="mt-4 text-light app-info-bg">
        <h1 style={{ fontSize: 21, fontWeight: "bold" }}>{strings.appTitle}</h1>
        <p className="my-4" style={{ fontSize: 17 }}>
          {strings.infoText1}
        </p>
        <Button className="mt-3" variant="success">
          <Link
            style={{ textDecoration: "none" }}
            className="text-white font-weight-bold text-uppercase"
            to="/register"
          >
            {strings.startFreeTrial}
          </Link>
        </Button>
      </Jumbotron>
    </Container>
  );
}
