import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Accordion from "react-bootstrap/Accordion";
import InputGroup from "react-bootstrap/InputGroup";
import { useGSC } from "../../../store/GlobalStateProvider";
import { useAuth } from "../../../contexts/AuthContext";
import { baseUrl } from "../../../config";
import Loading from "../../loading/Loading";
import AccordionToggle from "../../accordion/AccordionToggle";
import strings from "./strings";

export default function AddProject() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const hourlyRateRef = useRef();

  const { currentUser } = useAuth();
  const { projects, setProjects, language, isActive } = useGSC();

  strings.setLanguage(language);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    let name = nameRef.current.value;
    let rate = hourlyRateRef.current.value;

    if (!name) {
      setErrorMessage(strings.projectCannotBeEmpty);
      setLoading(false);
      return;
    }

    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(
        `${baseUrl}/projects`,
        { project_name: name, hourly_rate: rate },
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      let newProjects = [...projects, response.data];
      setProjects(newProjects);
    } catch (error) {
      setErrorMessage(strings.addingProjectFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-3">
      <Accordion className="mx-auto mw-1024">
        <Card>
          <AccordionToggle title={strings.addProject} />
          <Accordion.Collapse eventKey="0">
            <Card.Body className="mx-auto">
              <Container>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Control
                      className="mb-3"
                      required
                      ref={nameRef}
                      type="text"
                      placeholder={strings.projectName + "..."}
                    />
                    <InputGroup>
                      <FormControl
                        type="number"
                        placeholder={strings.hourlyRate + "..."}
                        ref={hourlyRateRef}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>EUR</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Container className="d-flex flex-column justify-content-center align-items-center">
                      <Button
                        type="submit"
                        disabled={!isActive}
                        className="mt-3 bg-primary border-primary"
                      >
                        {strings.add}
                      </Button>
                    </Container>
                  )}
                </Form>
              </Container>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}
