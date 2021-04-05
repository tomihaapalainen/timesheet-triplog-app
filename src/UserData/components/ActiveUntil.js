import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { datetimeAsDateString } from "../../utils/datetimeutils";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function ActiveUntil({ isActive, activeUntil }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const curDate = new Date().toISOString();
  const activeUntilDate = datetimeAsDateString(new Date(Date.parse(activeUntil)), "DD.MM.YYYY");

  return (
    <Container fluid className="mx-0 px-0 pt-3">
      <Card className="w-100 mx-0 px-0">
        <Card.Header
          className={`text-light font-weight-bold ${isActive ? "bg-success" : "bg-warning"}`}
        >
          {curDate < activeUntil ? (
            <p>
              {strings.accountActive} {activeUntilDate}
              {strings.until}
            </p>
          ) : (
            <p>
              {strings.accountExpired} {activeUntilDate}
            </p>
          )}
        </Card.Header>
      </Card>
    </Container>
  );
}
