import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import strings from "./strings";
import { useGSC } from "../../../store/GlobalStateProvider";

export default function CancelTripModal({ open, operation, close }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <Modal show={open}>
      <Modal.Header>
        <Modal.Title>{strings.confirmCancel}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{strings.cancelInfo}</p>
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Col>
            <Container>
              <Button className="bg-secondary text-primary text-uppercase" onClick={close}>
                {strings.close}
              </Button>
            </Container>
          </Col>
          <Col>
            <Container>
              <Button className="bg-primary text-uppercase" onClick={operation}>
                {strings.confirm}
              </Button>
            </Container>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}
