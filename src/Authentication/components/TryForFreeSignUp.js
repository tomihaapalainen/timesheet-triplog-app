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
        <h1 style={{ fontSize: 21, fontWeight: "bold" }}>{strings.appTitle}</h1>
        <h5 className="my-4" style={{ fontSize: 17 }}>
          {strings.infoText1}
        </h5>
      </Jumbotron>
    </Container>
  );
}
