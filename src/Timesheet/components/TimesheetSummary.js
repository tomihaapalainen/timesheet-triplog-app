import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function TimesheetSummary({
  startDate,
  endDate,
  lunchDuration,
  breakDuration,
  startHours,
  startMinutes,
  endHours,
  endMinutes,
}) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const calculateDuration = (sDate, sHours, sMinutes, eDate, eHours, eMinutes) => {
    if ((!sHours && sMinutes) || !(eHours && eMinutes)) {
      return "";
    }

    let startDatetime = new Date(sDate.getTime());
    startDatetime.setHours(parseInt(sHours), parseInt(sMinutes), 0, 0);
    let endDatetime = new Date(eDate.getTime());
    endDatetime.setHours(parseInt(eHours), parseInt(eMinutes), 0, 0);

    let diff = endDatetime.getTime() - startDatetime.getTime();
    if (lunchDuration) {
      diff -= parseInt(lunchDuration) * 60 * 1000;
    }
    if (breakDuration) {
      diff -= parseInt(breakDuration) * 60 * 1000;
    }

    diff = Math.max(0, diff);

    let diffDate = new Date(diff);
    return `${strings.workingTime}: ${diffDate.getUTCHours()}h ${diffDate.getUTCMinutes()}min`;
  };

  return (
    <Container
      fluid
      className="mw-1024 my-0 py-0 center-flex flex-column"
      style={{ height: "15px" }}
    >
      <Row className="my-0 py-0">
        {startHours && startMinutes && endHours && endMinutes && (
          <Col className="my-0 py-0">
            <p className="font-weight-bold">
              {calculateDuration(
                startDate,
                startHours,
                startMinutes,
                endDate,
                endHours,
                endMinutes
              )}
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
}
