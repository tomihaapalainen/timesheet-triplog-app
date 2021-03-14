import React, { useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { FaTrashAlt } from "react-icons/fa";
import AddProject from "./AddProject";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import AccordionToggle from "../../shared/AccordionToggle";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function ProjectsAccordion({ projects, setProjects }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useAuth();

  const handleRemove = async (projectId) => {
    let idToken = await currentUser.getIdToken(true);
    let response = await axios.delete(`${baseUrl}/project/${projectId}`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });

    if (response.status === 200) {
      let newProjects = projects.filter((p) => p.id !== projectId);
      setProjects(newProjects);
      let lastProject = localStorage.getItem("previous-project");
      if (projectId === lastProject) {
        localStorage.removeItem("previous-project");
      }
    } else {
      setErrorMessage(strings.addingProjectFailed);
    }
  };

  return (
    <Accordion className="mx-auto mw-1024">
      <Card>
        <AccordionToggle title={strings.projects} />
        <Accordion.Collapse eventKey="0">
          <Card.Body className="mx-auto">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {projects.length === 0 && (
              <Container className="my-3">
                <p>{strings.noAddedProjects}</p>
              </Container>
            )}
            <ListGroup>
              {projects.map((p) => (
                <ListGroup.Item key={p.id}>
                  <Container>
                    <Row className="align-items-center">
                      <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                        <p className="m-0 p-0">{p.project_name}</p>
                        {p.hourly_rate && p.hourly_rate > 0 && (
                          <p className="m-0 p-0">
                            {strings.hourlyRate}: {p.hourly_rate} €
                          </p>
                        )}
                      </Col>
                      <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Button
                          className="d-flex justify-content-center align-items-center"
                          onClick={() => handleRemove(p.id)}
                        >
                          <FaTrashAlt size={25} color="#fff" />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <AddProject />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
