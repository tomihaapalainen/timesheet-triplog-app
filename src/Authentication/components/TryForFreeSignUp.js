import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./styles.css";
import strings from "./strings";

export default function TryForFreeSignUp({ language }) {
  strings.setLanguage(language);

  return (
    <Container>
      <Jumbotron className="mt-4 text-light app-info-bg">
        <h1 className="app-title-header">{strings.infoText1}</h1>
      </Jumbotron>
    </Container>
  );
}
