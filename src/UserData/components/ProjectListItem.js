import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import ConfirmRemoveProjectModal from "./ConfirmRemoveProjectModal";
import { FaTrashAlt } from "react-icons/fa";
import strings from "./strings";

export default function ProjectListItem({ language, handleRemove, project }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  strings.setLanguage(language);

  const calculateRate = (rateInCentsPerHour) => {
    return (rateInCentsPerHour / 100).toFixed(2);
  };

  const removeProject = async (projectId) => {
    try {
      setLoading(true);
      await handleRemove(projectId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col xs={8}>
          <p className="m-0 p-0">{project.project_name}</p>
          {project.hourly_rate > 0 && (
            <p className="m-0 p-0">
              {strings.hourlyRate}: {calculateRate(project.hourly_rate)} €/
              {language === "fi" ? "t" : "h"}
            </p>
          )}
        </Col>
        <Col xs={4}>
          {loading && <Spinner variant="primary" animation="border" role="status" />}
          {!loading && (
            <Button
              variant="danger"
              className="d-flex justify-content-center align-items-center"
              onClick={() => setShow(true)}
            >
              <FaTrashAlt size={25} color="#FFF" />
            </Button>
          )}
        </Col>
      </Row>
      <ConfirmRemoveProjectModal
        show={show}
        setShow={setShow}
        removeProject={removeProject}
        projectId={project.id}
      />
    </Container>
  );
}
