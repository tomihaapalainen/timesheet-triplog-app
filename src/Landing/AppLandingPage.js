import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { FaBusinessTime, FaCarAlt } from "react-icons/fa";

export default function AppLandingPage() {
  const history = useHistory();

  const handleTimesheetClick = () => {
    history.push("/app/worktime");
  };

  const handleTripLogClick = () => {
    history.push("/app/triplog");
  };

  return (
    <Container
      className="center-flex justify-content-space-evenly w-100"
      style={{ height: "500px" }}
    >
      <Row>
        <Col>
          <Button className="btn-lg bg-primary" onClick={handleTimesheetClick}>
            <FaBusinessTime color="#fff" size={80} />
          </Button>
        </Col>
        <Col>
          <Button className="btn-lg bg-primary" onClick={handleTripLogClick}>
            <FaCarAlt color="#fff" size={80} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
