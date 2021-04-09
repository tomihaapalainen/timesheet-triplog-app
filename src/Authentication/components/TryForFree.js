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
    <Container>
      <Jumbotron className="mt-4 text-light app-info-bg">
        <h1 style={{ fontSize: 21, fontWeight: "bold" }}>{strings.appTitle}</h1>
        <h5 className="mt-4 mb-2" style={{ fontSize: 17 }}>
          {strings.infoText1}
        </h5>
        <h5 className="mt-4 mb-2" style={{ fontSize: 17 }}>
          {strings.infoText2}
        </h5>
        <Button
          className="mt-3 font-weight-bold text-uppercase"
          variant="success"
          onClick={handleClick}
        >
          {strings.startFreeTrial}
        </Button>
      </Jumbotron>
    </Container>
  );
}
