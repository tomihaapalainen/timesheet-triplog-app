import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import InputGroup from "react-bootstrap/InputGroup";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function WorkBreaks({
  lunchDuration,
  setLunchDuration,
  breakDuration,
  setBreakDuration,
}) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const [errorMessage, setErrorMessage] = useState("");

  const handleLunchDurationChanged = (event) => {
    if (isNaN(event.target.value)) {
      setErrorMessage(strings.lunchBreakDurationMustBeInt);
    } else {
      setLunchDuration(parseInt(event.target.value));
    }
  };

  const handleBreakDurationChanged = (event) => {
    if (isNaN(event.target.value)) {
      setErrorMessage(strings.breakDurationMustBeInt);
    } else {
      setBreakDuration(parseInt(event.target.value));
    }
  };

  return (
    <Container className="px-0 mx-0">
      <Card>
        <Card.Body className="my-1 py-2">
          <Col className="center-flex" style={{ justifyContent: "space-between" }}>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <Row className="w-50" style={{ minWidth: "100px", maxWidth: "420px" }}>
              <FormLabel>{strings.lunch}</FormLabel>
              <InputGroup>
                <FormControl
                  type="number"
                  value={lunchDuration}
                  onChange={handleLunchDurationChanged}
                  onFocus={(event) => event.target.select()}
                  onKeyUp={(event) => {
                    if (event.key === "Enter") {
                      event.target.blur();
                    }
                  }}
                />
                <InputGroup.Append>
                  <InputGroup.Text>min</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Row>
            <Row className="w-50" style={{ minWidth: "100px", maxWidth: "420px" }}>
              <FormLabel>{strings.breaks}</FormLabel>
              <InputGroup>
                <FormControl
                  type="number"
                  value={breakDuration}
                  onChange={handleBreakDurationChanged}
                  onFocus={(event) => event.target.select()}
                  onKeyUp={(event) => {
                    if (event.key === "Enter") {
                      event.target.blur();
                    }
                  }}
                />
                <InputGroup.Append>
                  <InputGroup.Text>min</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Row>
          </Col>
        </Card.Body>
      </Card>
    </Container>
  );
}
