import React, { useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import AddProject from "./AddProject";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import AccordionToggle from "../../shared/AccordionToggle";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";
import ProjectListItem from "./ProjectListItem";

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
                  <ProjectListItem language={language} handleRemove={handleRemove} project={p} />
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
