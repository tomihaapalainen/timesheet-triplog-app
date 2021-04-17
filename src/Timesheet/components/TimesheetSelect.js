import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DatePicker from "react-rainbow-components/components/DatePicker";
import TimePicker from "../../shared/TimePicker";
import Card from "react-bootstrap/Card";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function TimesheetSelect({
  startDate,
  setStartDate,
  endDate,
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

  const onStartDateChanged = (value) => {
    setStartDate(value);
    setEndDate(value);
  };

  return (
    <Container className="px-0 mx-0">
      <Card>
        <Card.Body className="my-1 py-1 mx-auto w-100" style={{ maxWidth: "600px" }}>
          <Row className="mb-2">
            <Col xs={7} className="mx-0 px-1 pt-1">
              <DatePicker
                label={strings.startingDate}
                value={startDate || new Date()}
                onChange={(val) => onStartDateChanged(val)}
                locale="fi-FI"
              />
            </Col>
            <Col xs={5} className="mx-0 px-1">
              <TimePicker
                label={strings.time}
                minsId="start-mins-input"
                hours={startHours}
                minutes={startMinutes}
                setHours={setStartHours}
                setMinutes={setStartMinutes}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={7} className="mx-0 px-1 pt-1">
              <DatePicker
                label={strings.endingDate}
                value={endDate || new Date()}
                onChange={(val) => setEndDate(val)}
                locale="fi-FI"
              />
            </Col>
            <Col xs={5} className="mx-0 px-1">
              <TimePicker
                label={strings.time}
                minsId="end-mins-input"
                hours={endHours}
                minutes={endMinutes}
                setHours={setEndHours}
                setMinutes={setEndMinutes}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
