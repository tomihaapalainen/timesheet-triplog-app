import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DatePicker from "react-rainbow-components/components/DatePicker";
import TimePicker from "react-rainbow-components/components/TimePicker";
import Card from "react-bootstrap/Card";
import { currentTime } from "../../utils/datetimeutils";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function TimesheetSelect({
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
}) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const onStartDateChanged = (value) => {
    setStartDate(value);
    setEndDate(value);
  };

  return (
    <Container className="px-0 mx-0">
      <Card>
        <Card.Body className="my-1 py-1 mx-auto w-100" style={{ maxWidth: "600px" }}>
          <Row className="mb-3">
            <Col xs={7} className="mx-0 px-1">
              <DatePicker
                label={strings.startingDate}
                value={startDate || new Date()}
                onChange={(val) => onStartDateChanged(val)}
                locale="fi-FI"
                style={startDate && { backgroundColor: "#53aceb88", borderRadius: "25px" }}
              />
            </Col>
            <Col xs={5} className="mx-0 px-1">
              <TimePicker
                label={strings.time}
                value={startTime !== null ? startTime : currentTime()}
                onChange={(val) => setStartTime(val)}
                hour24
                locale="fi-FI"
                style={startTime && { backgroundColor: "#53aceb88", borderRadius: "25px" }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={7} className="mx-0 px-1">
              <DatePicker
                label={strings.endingDate}
                value={endDate || new Date()}
                onChange={(val) => setEndDate(val)}
                locale="fi-FI"
                style={endDate && { backgroundColor: "#53aceb88", borderRadius: "25px" }}
              />
            </Col>
            <Col xs={5} className="mx-0 px-1">
              <TimePicker
                label={strings.time}
                value={endTime !== null ? endTime : currentTime()}
                onChange={(val) => setEndTime(val)}
                hour24
                locale="fi-FI"
                style={endTime && { backgroundColor: "#53aceb88", borderRadius: "25px" }}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
