import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function TwoButtons({
  leftLabel,
  leftAction,
  rightLabel,
  rightAction,
  rightDisabled,
}) {
  return (
    <Container className="m-0 p-0">
      <Row>
        <Col>
          {leftLabel && (
            <Container>
              <Button
                style={{ minWidth: "100px" }}
                className="w-100 bg-danger text-uppercase"
                onClick={leftAction}
              >
                {leftLabel}
              </Button>
            </Container>
          )}
        </Col>
        <Col>
          <Container>
            <Button
              style={{ minWidth: "100px" }}
              className="w-100 bg-primary text-uppercase"
              onClick={rightAction}
              {...rightDisabled()}
            >
              {rightLabel}
            </Button>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
