import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { FaTrashAlt } from "react-icons/fa";

export default function WorkTimeListItem({ handleRemove, workTime }) {
  const [loading, setLoading] = useState(false);

  const removeWorkTime = async (workTimeId) => {
    try {
      setLoading(true);
      await handleRemove(workTimeId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="center-flex">
        <Col className="mx-0 px-0" xs={8}>
          <p className="m-0 p-0">
            {workTime.start} - {workTime.end}
          </p>
        </Col>
        <Col className="mx-0 px-0" xs={4}>
          {loading && (
            <Spinner
              className="d-flex ml-auto"
              animation="border"
              role="status"
              variant="primary"
            />
          )}
          {!loading && (
            <Button
              variant="danger"
              className="d-flex ml-auto"
              onClick={() => removeWorkTime(workTime.id)}
            >
              <FaTrashAlt size={25} color="#FFF" />
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
