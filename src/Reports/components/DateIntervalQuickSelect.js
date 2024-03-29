import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useGSC } from "../../store/GlobalStateProvider";
import strings from "./strings";

export default function DateIntervalQuickSelect({ setStart, setEnd }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const handlePreviousMonthClicked = () => {
    let now = new Date();

    let start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    let end = new Date(now.getFullYear(), now.getMonth(), 0);
    setStart(start);
    setEnd(end);
  };

  const handleThisMonthClicked = () => {
    let now = new Date();

    let start = new Date(now.getFullYear(), now.getMonth(), 1);
    let end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 1);

    setStart(start);
    setEnd(end);
  };

  return (
    <Container
      className="center-flex flex-column"
      style={{
        height: "75px",
      }}
    >
      <Row>
        <ButtonGroup className="d-flex">
          <Button
            className="m-2"
            style={{ borderRadius: "5px 0 0 5px", padding: "5px 15px" }}
            onClick={handlePreviousMonthClicked}
          >
            {strings.lastMonth}
          </Button>
          <Button
            className="m-2"
            style={{ borderRadius: "0 5px 5px 0", padding: "5px 15px" }}
            onClick={handleThisMonthClicked}
          >
            {strings.thisMonth}
          </Button>
        </ButtonGroup>
      </Row>
    </Container>
  );
}
