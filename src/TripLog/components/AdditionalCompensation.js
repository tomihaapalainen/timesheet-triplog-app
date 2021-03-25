import React from "react";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import strings from "./strings";

export default function AdditionalCompensation({
  additionalCompensation,
  additionalCompensationRef,
  additionalCompensationAmount,
  additionalCompensationAmountRef,
}) {
  const selectAllOnFocus = (event) => {
    event.target.select();
  };

  return (
    <Container fluid className="mx-0 px-3">
      <Row className="mb-2">
        <p style={{ fontSize: 15 }}>{strings.additionalCompensation}</p>
      </Row>
      <Row className="mb-2">
        <Col className="mx-0 px-0" xs={6}>
          <FormControl
            id="first-comp-name"
            placeholder={strings.explanation}
            onFocus={selectAllOnFocus}
            ref={additionalCompensationRef}
            defaultValue={additionalCompensation}
          />
        </Col>
        <Col className="mx-0 px-0" xs={6}>
          <InputGroup>
            <FormControl
              id="first-comp-val"
              onFocus={selectAllOnFocus}
              ref={additionalCompensationAmountRef}
              placeholder={strings.compensation}
              defaultValue={additionalCompensationAmount}
            />{" "}
            <InputGroup.Append>
              <InputGroup.Text className="px-1">€/km</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}
