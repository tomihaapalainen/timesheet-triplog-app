import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import strings from "../strings";
import "../styles.css";

export default function Header({ language }) {
  strings.setLanguage(language);

  return (
    <Container className="landing-page">
      <Row>
        <Container>
          <h1 className="app-title-header">{strings.header}</h1>
        </Container>
      </Row>
      <Row>
        <Container>
          <h2 className="second-title">{strings.header2}</h2>
        </Container>
      </Row>
    </Container>
  );
}
