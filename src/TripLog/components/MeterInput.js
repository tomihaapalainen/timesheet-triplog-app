import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function MeterInput({ kilometers, setCurrentKilometers }) {
  const [showEntry, setShowEntry] = useState(0);
  const [inputError, setInputError] = useState("");
  const kmEntryRef = useRef();

  const { language } = useGSC();
  strings.setLanguage(language);

  const onKmButtonClick = (c) => {
    setShowEntry(c);
    setTimeout(() => {
      kmEntryRef.current.focus();
    }, 0.5);
  };

  const handleKmEntryChanged = (event) => {
    let targetValueString = event.target.value.toString();

    if (targetValueString.length === showEntry) {
      if (/^\d+$/.test(targetValueString)) {
        let currentValueString = kilometers.map((km) => km.value).join("");
        let newValue =
          currentValueString.substring(0, currentValueString.length - targetValueString.length) +
          targetValueString;
        setCurrentKilometers(newValue);
        setShowEntry(0);
      } else {
        setInputError(strings.numberMustBeAnInteger);
      }
    }
  };

  return (
    <Container fluid className="px-0 mx-0 w-100">
      <Row>
        <p className="mx-auto mb-1">{strings.kilometerage}</p>
      </Row>
      <Row className="mx-0 px-0 w-100 center-flex">
        {kilometers.map((k) => (
          <Col xs={2} key={k.count} className="mx-0 px-0 center-flex">
            <Button
              className="font-weight-bold center-flex mb-1"
              style={{
                height: 75,
                fontSize: 25,
                width: "90%",
                fontWeight: "bold",
              }}
              onClick={() => onKmButtonClick(k.count)}
            >
              <p className="px-1">{k.value}</p>
            </Button>
          </Col>
        ))}
      </Row>
      <Modal show={Boolean(showEntry)} onHide={() => setShowEntry(0)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {strings.give} {showEntry} {showEntry > 1 ? strings.numbers : strings.number}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {inputError && <p>{inputError}</p>}
          <Form.Group>
            <Form.Label>{strings.kilometerage}</Form.Label>
            <Form.Control ref={kmEntryRef} type="number" onChange={handleKmEntryChanged} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="text-uppercase" variant="secondary" onClick={() => setShowEntry(0)}>
            {strings.close}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
