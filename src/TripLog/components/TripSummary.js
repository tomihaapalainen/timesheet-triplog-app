import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { datetimeAsDateAndTimeString } from "../../utils/datetimeutils";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function TripSummary({ tripData }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const calculateDistance = (start, end) => {
    return parseInt(end) - parseInt(start);
  };

  return (
    <Container className="mt-3" style={{ maxWidth: "720px" }}>
      <Card>
        <Card.Header className="bg-primary text-light">
          <Card.Title>{strings.tripSavedSuccessfully}</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <p>
                {strings.vehicle}: {tripData.vehicle}
              </p>
              <p>
                {strings.route}: {tripData.route}
              </p>
              <p>
                {strings.description}: {tripData.description}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col xs={7}>{datetimeAsDateAndTimeString(tripData.start_datetime, language)}</Col>
                <Col xs={5}>{tripData.start_km}</Col>
              </Row>
              <Row>
                <Col xs={7}>{datetimeAsDateAndTimeString(tripData.end_datetime, language)}</Col>
                <Col xs={5}>{tripData.end_km}</Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    {strings.tripDistance}: {tripData.end_km - tripData.start_km} km
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                {strings.compensation}: {tripData.compensation / 100} €/km
              </p>
              <p>
                {strings.total}:{" "}
                {calculateDistance(tripData.start_km, tripData.end_km) *
                  (tripData.compensation / 100)}{" "}
                €
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}
