import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export default function AccordionToggle({ title, variant }) {
  const [open, setOpen] = useState(false);

  return (
    <Accordion.Toggle
      as={Card.Header}
      onClick={() => setOpen(!open)}
      eventKey="0"
      className={`bg-${variant ?? "primary"} text-light pointer`}
    >
      <Container className="mx-0 px-0">
        <Row className="justify-content-space-between">
          <Col xs={10}>
            <p className="m-0 p-0 font-weight-bold">{title}</p>
          </Col>
          <Col className="d-flex justify-content-end" xs={2}>
            {open ? <FaAngleUp color="#fff" size={20} /> : <FaAngleDown color="#fff" size={20} />}
          </Col>
        </Row>
      </Container>
    </Accordion.Toggle>
  );
}
