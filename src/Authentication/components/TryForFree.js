import React from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";
import "./styles.css";

export default function TryForFree() {
  const { language } = useGSC();
  strings.setLanguage(language);

  const history = useHistory();

  const handleClick = () => {
    history.push("/register");
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center">
      <Jumbotron className="mt-4 text-primary bg-light">
        <h1 className="app-title-header">
          <strong>{strings.timesheets}</strong> {strings.and}
          <br />
          <strong>{strings.triplogs}</strong>
        </h1>
        <Button
          className="mt-3 font-weight-bold text-uppercase free-trial-btn"
          variant="success"
          onClick={handleClick}
        >
          {strings.startFreeTrial}
        </Button>
      </Jumbotron>
    </Container>
  );
}
