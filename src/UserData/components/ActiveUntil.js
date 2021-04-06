import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { datetimeAsDateString } from "../../utils/datetimeutils";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function ActiveUntil({ isActive, activeUntil }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const activeUntilDate = datetimeAsDateString(new Date(Date.parse(activeUntil)), language);

  return (
    <Container fluid className="mx-0 px-0 pt-3">
      <Card className="w-100 mx-0 px-0">
        <Card.Header className={`text-light ${isActive ? "bg-success" : "bg-warning"}`}>
          {isActive ? (
            <p className="font-weight-bold">
              {strings.accountActive} {activeUntilDate}
              {strings.until}
            </p>
          ) : (
            <p className="text-dark">
              {strings.accountExpired} {activeUntilDate}
            </p>
          )}
        </Card.Header>
      </Card>
    </Container>
  );
}
