import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { currentTime } from "../../utils/datetimeutils";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function TimesheetControls({
  setStartDate,
  startTime,
  setStartTime,
  setEndDate,
  endTime,
  setEndTime,
}) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const handleStartNow = () => {
    let date = new Date();
    setStartDate(date);
    setStartTime(currentTime());
  };

  const handleEndNow = () => {
    let date = new Date();
    setEndDate(date);
    setEndTime(currentTime());
  };

  return (
    <Container className="px-0 mx-0 center-flex flex-column">
      <Row className="mt-4 mb-3" style={{ height: "45px" }}>
        <Col xs={6}>
          <Button
            onClick={handleStartNow}
            style={{ minWidth: "125px" }}
            disabled={startTime !== null}
          >
            {startTime === null ? strings.startNow : strings.started}
          </Button>
          {startTime !== null && endTime === null && (
            <Row>
              <p className="mx-auto">{startTime}</p>
            </Row>
          )}
        </Col>
        <Col xs={6}>
          <Button
            onClick={handleEndNow}
            style={{ minWidth: "125px" }}
            disabled={startTime === null || endTime !== null}
          >
            {endTime === null ? strings.endNow : strings.ended}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
