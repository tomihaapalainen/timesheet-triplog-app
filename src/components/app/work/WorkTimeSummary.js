import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { datetimeAsDateString } from "../../../utils/datetimeutils";
import strings from "./strings";
import { useGSC } from "../../../store/GlobalStateProvider";

export default function WorkTimeSummary({
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
        <Container className="w-100 px-0 mx-auto">
          <Row>
            <Col className="summary-column">
              <p className="m-1 p-0">
                {datetimeAsDateString(startDate, "DD.MM.YYYY")}
                {startDate.getDay() !== endDate.getDay() &&
                  ` - ${datetimeAsDateString(endDate, "DD.MM.YYYY")}`}{" "}
              </p>
            </Col>
            <Col className="summary-column">
              <p className="m-1 p-0">
                {startTime} - {endTime}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="summary-column">
              <p className="m-1 p-0">
                {strings.lunch}: {lunchDuration} min
              </p>
            </Col>
            <Col className="summary-column">
              <p className="m-1 p-0">
                {strings.breaks}: {breakDuration} min
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="summary-column">
              <p className="m-1 p-0">{calculateDuration(startDate, startTime, endDate, endTime)}</p>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}
