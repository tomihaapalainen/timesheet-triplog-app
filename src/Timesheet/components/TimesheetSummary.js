import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { datetimeAsDateString } from "../../utils/datetimeutils";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function TimesheetSummary({
  startDate,
  startTime,
  endDate,
  endTime,
  lunchDuration,
  breakDuration,
}) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const calculateDuration = (sDate, sTime, eDate, eTime) => {
    if (sTime === null || eTime === null) {
      return "";
    }

    let [startHours, startMins] = sTime.match(/\d\d/gi);
    let [endHours, endMins] = eTime.match(/\d\d/gi);
    let startDatetime = new Date(sDate.getTime());
    startDatetime.setHours(parseInt(startHours), parseInt(startMins), 0, 0);
    let endDatetime = new Date(eDate.getTime());
    endDatetime.setHours(parseInt(endHours), parseInt(endMins), 0, 0);

    let diff = endDatetime.getTime() - startDatetime.getTime();
    if (lunchDuration) {
      diff -= parseInt(lunchDuration) * 60 * 1000;
    }
    if (breakDuration) {
      diff -= parseInt(breakDuration) * 60 * 1000;
    }

    diff = Math.max(0, diff);

    let diffDate = new Date(diff);
    return `${strings.duration}: ${diffDate.getUTCHours()}h ${diffDate.getUTCMinutes()}min`;
  };

  return (
    <Container className="mw-1024">
      {startTime && endTime && (
        <Card>
          <Card.Header className="bg-primary text-white pb-0">
            <Card.Title>{strings.summary}</Card.Title>
          </Card.Header>
          <Card.Body className="w-100">
            <Row>
              <Col xs={12} sm={6}>
                <p>
                  {datetimeAsDateString(startDate, language)}
                  {startDate.getDay() !== endDate.getDay() &&
                    ` - ${datetimeAsDateString(endDate, language)}`}{" "}
                </p>
              </Col>
              <Col xs={12} sm={6}>
                <p>
                  {startTime} - {endTime}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  {strings.lunch}:<br />
                  {lunchDuration} min
                </p>
              </Col>
              <Col>
                <p>
                  {strings.breaks}:<br />
                  {breakDuration} min
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{calculateDuration(startDate, startTime, endDate, endTime)}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
