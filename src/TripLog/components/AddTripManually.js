import React, { useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";
import DatePicker from "react-rainbow-components/components/DatePicker";

import TimePicker from "../../shared/TimePicker";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";
import { baseUrl } from "../../config";
import { useAuth } from "../../contexts/AuthContext";
import { currentHours, currentMinutes, datetimeToLocalISOString } from "../../utils/datetimeutils";
import { FaAngleDown, FaAngleUp, FaCheckCircle } from "react-icons/fa";

export default function AddTripManually({
  kilometers,
  selectedProject,
  vehicle,
  descriptionRef,
  route,
  setRoute,
  compensationRef,
  setTripData,
}) {
  const { language, isActive } = useGSC();
  strings.setLanguage(language);

  const { currentUser } = useAuth();

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [startHours, setStartHours] = useState(null);
  const [startMinutes, setStartMinutes] = useState(null);
  const [endHours, setEndHours] = useState(null);
  const [endMinutes, setEndMinutes] = useState(null);

  const [distance, setDistance] = useState("");

  const parseKilometers = () => {
    return parseInt(kilometers.map((km) => km.value).join(""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentKilometers = parseKilometers();
    let traveledDistance = parseInt(distance);
    let compensation = parseFloat(compensationRef.current.value);

    let errors = [];

    if (!selectedProject) {
      errors.push(strings.checkProject);
    }
    if (!vehicle) {
      errors.push(strings.checkVehicle);
    }
    if (isNaN(compensation)) {
      errors.push(strings.checkCompensation);
    }
    if (!route) {
      errors.push(strings.checkRoute);
    }
    if (currentKilometers === 0) {
      errors.push(strings.checkKilometers);
    }
    if (isNaN(traveledDistance)) {
      errors.push(strings.checkTripDistance);
    }

    if (errors.length > 0) {
      setErrorMessage(strings.check + ": " + errors.join(", "));
      return;
    }

    let start = new Date(startDate.getTime());
    let end = new Date(endDate.getTime());

    start.setHours(startHours, startMinutes, 0, 0);
    end.setHours(endHours, endMinutes, 0, 0);

    let compensationAmount = compensationRef.current.value;
    let data = {
      vehicle: vehicle,
      project_id: selectedProject,
      start_km: currentKilometers - traveledDistance,
      start_datetime: datetimeToLocalISOString(start),
      end_km: currentKilometers,
      end_datetime: datetimeToLocalISOString(end),
      compensation: parseFloat(compensationAmount) * 100,
      description: descriptionRef.current.value,
      route: route,
    };

    try {
      setLoading(true);
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(`${baseUrl}/trips`, data, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (response.status === 200) {
        setTripData(response.data);
        sessionStorage.removeItem("last-trip-data");
        setShowSuccess(true);
        setDistance("");
        setRoute("");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(strings.errorSavingTrip);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStartChanged = (value) => {
    setStartDate(value);
    let x = new Date(value.getTime());
    let end = new Date();
    end.setFullYear(x.getFullYear(), x.getMonth(), x.getDate());
    setEndDate(end);
  };

  return (
    <Container fluid className="my-2 mx-0 px-0 w-100">
      <Accordion className="pb-2 mx-0 px-0 w-100">
        <Card className="w-100 mx-0 px-0">
          <Accordion.Toggle
            as={Card.Header}
            className="my-0 py-1 bg-primary text-light pointer"
            eventKey="0"
            onClick={() => setOpen(!open)}
          >
            <Container fluid className="mx-0 px-0">
              <Row className="justify-content-space-between align-items-center">
                <Col xs={10}>
                  <p className="py-1 my-0 accordion-title">{strings.addTripManually}</p>
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
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 100,
              margin: "5px",
              width: "90%",
            }}
            variant="danger"
            show={Boolean(errorMessage)}
            onClose={() => setErrorMessage("")}
            dismissible
          >
            <Container fluid className="mx-0 px-0">
              <Row className="p-4">{errorMessage}</Row>
              <Row className="d-flex flex-row justify-content-end">
                <Button variant="danger" onClick={() => setErrorMessage("")}>
                  OK
                </Button>
              </Row>
            </Container>
          </Alert>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="w-100">
              <Form>
                <FormGroup>
                  <Row className="w-100 mx-0 px-0">
                    <Col className="w-100 mx-0 px-0 pt-1" xs={7}>
                      <DatePicker
                        value={startDate}
                        onChange={handleStartChanged}
                        label={strings.tripStartDate}
                        locale="fi-FI"
                        hour24
                      />
                    </Col>
                    <Col className="w-100 mx-0 px-0" xs={5}>
                      <TimePicker
                        label={strings.time}
                        minsId="manual-start-mins-input"
                        hours={startHours || currentHours()}
                        minutes={startMinutes || currentMinutes()}
                        setHours={setStartHours}
                        setMinutes={setStartMinutes}
                      />
                    </Col>
                  </Row>
                  <Row className="w-100 mx-0 px-0">
                    <Col className="w-100 mx-0 px-0 pt-1" xs={7}>
                      <DatePicker
                        value={endDate}
                        onChange={(value) => setEndDate(value)}
                        label={strings.tripEndDate}
                        locale="fi-FI"
                        hour24
                      />
                    </Col>
                    <Col className="w-100 mx-0 px-0" xs={5}>
                      <TimePicker
                        label={strings.time}
                        minsId="manual-end-mins-input"
                        hours={endHours || currentHours()}
                        minutes={endMinutes || currentMinutes()}
                        setHours={setEndHours}
                        setMinutes={setEndMinutes}
                      />
                    </Col>
                  </Row>

                  <Container className="mx-0 px-0 pt-2">
                    <Form.Label className="mr-2">{strings.kilometerage}:</Form.Label>
                    <Form.Label>{parseKilometers()}</Form.Label>
                  </Container>
                  <InputGroup>
                    <Form.Control
                      placeholder={strings.tripDistance + "*"}
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>km</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </FormGroup>
                <Container className="d-flex justify-content-center">
                  {loading && (
                    <Container fluid className="center-flex">
                      <Spinner variant="primary" animation="border" role="status" />
                    </Container>
                  )}
                  {!loading && (
                    <Button onClick={handleSubmit} disabled={!isActive}>
                      {strings.save}
                    </Button>
                  )}
                </Container>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
          <Container fluid className="center-flex">
            <Toast
              className="bg-success text-white"
              style={{ position: "absolute", height: "80px", top: 45, zIndex: 100 }}
              onClose={() => setShowSuccess(false)}
              show={showSuccess}
              autohide
              delay={2000}
            >
              <Toast.Body className="center-flex h-100">
                <p className="lead mr-2">{strings.tripSavedSuccessfully}</p>
                <FaCheckCircle color="white" size={30} />
              </Toast.Body>
            </Toast>
          </Container>
        </Card>
      </Accordion>
    </Container>
  );
}
