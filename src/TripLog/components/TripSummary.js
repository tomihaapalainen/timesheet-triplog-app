import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { datetimeAsDateAndTimeString } from "../../utils/datetimeutils";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function TripSummary({ tripData }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <Container className="px-0 mx-0" style={{ maxWidth: "720px" }}>
      <Row>
        <Col>
          <p className="my-0 py-0" style={{ fontWeight: "bold", textDecoration: "underline" }}>
            {strings.summary}:
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="my-0 py-0 mb-2">
            {strings.vehicle}: {tripData.vehicle}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="my-0 py-0">
            {strings.start}:{" "}
            {datetimeAsDateAndTimeString(tripData.start_datetime, "DD.MM.YYYY", "HH:mm")}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="my-0 py-0"></p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="my-0 py-0">{tripData.start_address}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="my-0 py-0 mb-2">
            {strings.kilometerageAtStart}: {tripData.start_km} km
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="my-0 py-0">
            {strings.end}:{" "}
            {datetimeAsDateAndTimeString(tripData.end_datetime, "DD.MM.YYYY", "HH:mm")}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="my-0 py-0">{tripData.end_address}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="my-0 py-0">
            {strings.kilometerageAtEnd}: {tripData.end_km} km
          </p>
        </Col>
      </Row>
    </Container>
  );
}
