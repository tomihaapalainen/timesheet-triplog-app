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
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={8} className="d-flex justify-content-center align-items-center">
          <p className="m-0 p-0">
            {workTime.start} - {workTime.end}
          </p>
        </Col>
        <Col xs={4}>
          {loading && <Spinner animation="border" role="status" variant="primary" />}
          {!loading && (
            <Button
              variant="danger"
              className="d-flex justify-content-center align-items-center"
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
