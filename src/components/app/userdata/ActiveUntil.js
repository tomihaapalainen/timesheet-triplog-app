import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { datetimeAsDateString } from "../../../utils/datetimeutils";
import strings from "./strings";
import { useGSC } from "../../../store/GlobalStateProvider";

export default function ActiveUntil({ activeUntil }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const curDate = new Date().toISOString();
  const activeUntilDate = datetimeAsDateString(new Date(Date.parse(activeUntil)), "DD.MM.YYYY");

  return (
    <Container style={{ height: "80px", display: "flex", alignItems: "center" }}>
      <Row>
        <Col>
          {curDate < activeUntil ? (
            <p>
              {strings.accountActive} {activeUntilDate}
              {strings.until}
            </p>
          ) : (
            <p className="text-danger">
              {strings.accountExpired} {activeUntilDate}
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
