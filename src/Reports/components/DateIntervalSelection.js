import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DatePicker from "react-rainbow-components/components/DatePicker";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function DateIntervalSelection({ start, setStart, end, setEnd }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const handleSetStart = (value) => {
    value.setMinutes(0, 0, 0);
    setStart(value);
  };

  const handleSetEnd = (value) => {
    setEnd(value);
  };

  return (
    <Container style={{ height: "100px", maxWidth: "500px" }}>
      <Row>
        <Col className="my-1">
          <DatePicker
            value={start}
            onChange={(value) => handleSetStart(value)}
            label={strings.startingDate + "*"}
            locale="fi-FI"
          />
        </Col>
        <Col className="my-1">
          <DatePicker
            value={end}
            onChange={(value) => handleSetEnd(value)}
            label={strings.endingDate + "*"}
            locale="fi-FI"
          />
        </Col>
      </Row>
    </Container>
  );
}
