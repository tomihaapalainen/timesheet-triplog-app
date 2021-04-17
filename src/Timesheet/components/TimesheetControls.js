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
  setEndDate,
  startHours,
  startMinutes,
  endHours,
  endMinutes,
  setStartHours,
  setStartMinutes,
  setEndHours,
  setEndMinutes,
}) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const handleStartNow = () => {
    let date = new Date();
    setStartDate(date);
    let [shours, smins] = currentTime().split(":");
    setStartHours(shours);
    setStartMinutes(smins);
  };

  const handleEndNow = () => {
    let date = new Date();
    setEndDate(date);
    let [ehours, emins] = currentTime().split(":");
    setEndHours(ehours);
    setEndMinutes(emins);
  };

  return (
    <Container className="px-0 mx-0 center-flex flex-column">
      <Row className="mt-4 mb-3 w-100">
        <Col className="w-100" xs={6}>
          <Button
            className="w-100"
            onClick={handleStartNow}
            style={{ minWidth: "125px" }}
            disabled={startHours && startMinutes}
          >
            {!(startHours && startMinutes)
              ? strings.startNow
              : strings.started + `: ${startHours}:${startMinutes}`}
          </Button>
        </Col>
        <Col className="w-100" xs={6}>
          <Button
            className="w-100"
            onClick={handleEndNow}
            style={{ minWidth: "125px" }}
            disabled={(!startHours && !startMinutes) || (endHours && endMinutes)}
          >
            {!(endHours && endMinutes)
              ? strings.endNow
              : strings.ended + `: ${endHours}:${endMinutes}`}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
