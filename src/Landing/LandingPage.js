import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { FaBusinessTime, FaCarAlt } from "react-icons/fa";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100%",
  height: "500px",
};

export default function AppPage() {
  const history = useHistory();

  const handleWorkTimeClick = () => {
    history.push("/app/worktime");
  };

  const handleTripLogClick = () => {
    history.push("/app/triplog");
  };

  return (
    <Container style={containerStyle}>
      <Row>
        <Col>
          <Button className="btn-lg bg-primary" onClick={handleWorkTimeClick}>
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
