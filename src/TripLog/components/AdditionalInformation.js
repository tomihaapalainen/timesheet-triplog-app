import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useGSC } from "../../store/GlobalStateProvider";
import AdditionalCompensation from "./AdditionalCompensation";
import strings from "./strings";

export default function AdditionalInformation({
  description,
  descriptionRef,
  passengerCount,
  passengerCountRef,
  additionalCompensation,
  additionalCompensationRef,
  additionalCompensationAmount,
  additionalCompensationAmountRef,
}) {
  const [open, setOpen] = useState(false);

  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <Container fluid className="my-2 mx-0 px-0 w-100">
      <Accordion className="mx-0 px-0 w-100">
        <Card className="w-100 mx-0 px-0">
          <Accordion.Toggle
            as={Card.Header}
            className="my-0 py-1 bg-primary text-light"
            eventKey="0"
            onClick={() => setOpen(!open)}
          >
            <Container className="mx-0 px-0">
              <Row className="justify-content-space-between align-items-center">
                <Col xs={10}>
                  <p className="py-1 my-0">{strings.additionalInfo}</p>
                </Col>
                <Col className="d-flex justify-content-end" xs={2}>
                  {open ? (
                    <FaAngleUp color="#fff" size={20} />
                  ) : (
                    <FaAngleDown color="#fff" size={20} />
                  )}
                </Col>
              </Row>
            </Container>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <FormControl
                className="mb-3"
                placeholder={strings.description}
                ref={descriptionRef}
                type="text"
                defaultValue={description}
              />
              <FormControl
                className="mb-3"
                ref={passengerCountRef}
                defaultValue={passengerCount}
                type="number"
                placeholder={strings.additionalPassengers}
              />
              <AdditionalCompensation
                additionalCompensation={additionalCompensation}
                additionalCompensationRef={additionalCompensationRef}
                additionalCompensationAmount={additionalCompensationAmount}
                additionalCompensationAmountRef={additionalCompensationAmountRef}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}
