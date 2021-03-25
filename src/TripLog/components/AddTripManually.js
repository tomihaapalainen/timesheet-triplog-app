import React, { useRef, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import DateTimePicker from "react-rainbow-components/components/DateTimePicker";

import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";
import { baseUrl } from "../../config";
import { useAuth } from "../../contexts/AuthContext";
import { datetimeToLocalISOString } from "../../utils/datetimeutils";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import MeterInput from "./MeterInput";

export default function AddTripManually({
  kilometers,
  setCurrentKilometers,
  selectedProject,
  vehicle,
  descriptionRef,
  route,
  compensationRef,
  passengerCountRef,
  additionalCompensationRef,
  additionalCompensationAmountRef,
}) {
  const { language, isActive } = useGSC();
  strings.setLanguage(language);

  const { currentUser } = useAuth();

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [startDatetime, setStartDatetime] = useState(null);
  const [endDatetime, setEndDatetime] = useState(null);
  const [open, setOpen] = useState(false);

  const [distance, setDistance] = useState("");

  const parseKilometers = () => {
    return parseInt(kilometers.map((km) => km.value).join(""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentKilometers = parseKilometers();
    let traveledDistance = parseInt(distance);

    if (isNaN(traveledDistance)) {
      setErrorMessage(strings.invalidManualValues);
      return;
    }

    let passengerCount = passengerCountRef.current.value;

    let compensationAmount = compensationRef.current.value;
    let additionalCompensation = additionalCompensationRef.current.value;
    let additionalCompensationAmount = additionalCompensationAmountRef.current.value;

    let data = {
      vehicle: vehicle,
      project_id: selectedProject,
      start_km: currentKilometers - traveledDistance,
      start_datetime: datetimeToLocalISOString(startDatetime),
      end_km: currentKilometers,
      end_datetime: datetimeToLocalISOString(endDatetime),
      compensation: parseFloat(compensationAmount) * 100,
      additional_compensation: additionalCompensationAmount
        ? additionalCompensationAmount * 100
        : 0,
      passenger_count: passengerCount ? passengerCount : 0,
      description:
        descriptionRef.current.value + additionalCompensation ? ` +${additionalCompensation}` : "",
      route: route,
    };

    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(`${baseUrl}/trips`, data, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (response.status === 200) {
        setShowSuccess(true);
        setDistance(0);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(strings.errorSavingTrip);
      }
    }
  };

  return (
    <Container fluid className="my-2 mx-0 px-0 w-100">
      <Accordion className="pb-2 mx-0 px-0 w-100">
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
                  <p className="py-1 my-0">{strings.addTripManually}</p>
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
          <Alert
            style={{ position: "absolute", top: 0, left: 0, zIndex: 100, margin: "5px" }}
            variant="danger"
            show={Boolean(errorMessage)}
            onClose={() => setErrorMessage("")}
            dismissible
          >
            <Container>
              <Row>{errorMessage}</Row>
              <Row className="d-flex flex-row justify-content-end">
                <Button variant="danger" onClick={() => setErrorMessage("")}>
                  OK
                </Button>
              </Row>
            </Container>
          </Alert>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <DateTimePicker
                    style={{ marginBottom: "5px" }}
                    value={startDatetime || new Date()}
                    onChange={(value) => setStartDatetime(value)}
                    label={strings.tripStart}
                    locale="fi-FI"
                    hour24
                  />
                  <DateTimePicker
                    style={{ marginBottom: "5px" }}
                    value={endDatetime || new Date()}
                    onChange={(value) => setEndDatetime(value)}
                    label={strings.tripEnd}
                    locale="fi-FI"
                    hour24
                  />
                  <MeterInput kilometers={kilometers} setCurrentKilometers={setCurrentKilometers} />
                  <Form.Label className="my-0 py-0">{strings.tripDistance + "*"}</Form.Label>
                  <Form.Control
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </FormGroup>
                <Container className="d-flex justify-content-center">
                  <Button type="submit" disabled={!isActive}>
                    {strings.save}
                  </Button>
                </Container>
              </Form>
              <Toast
                style={{ position: "absolute", top: 0, left: 0 }}
                onClose={() => setShowSuccess(false)}
                show={showSuccess}
                delay={3000}
                autohide
              >
                <Toast.Body className="w-100 h-25">
                  <p>{strings.tripSavedSuccessfully}</p>
                </Toast.Body>
              </Toast>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}
