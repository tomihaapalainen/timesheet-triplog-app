import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../contexts/AuthContext";
import { useGSC } from "../store/GlobalStateProvider";
import strings from "../WorkTime/components/strings";
import { baseUrl } from "../config";
import Loading from "./Loading";

export default function AddProjectModal({ show, setShow }) {
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
      setShow(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{strings.addProject}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loading />
          ) : (
            <Container className="d-flex flex-column">
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    id="project-name-input"
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
                <Container className="d-flex">
                  <Button className="mx-auto" variant="primary" type="submit" disabled={!isActive}>
                    {strings.add}
                  </Button>
                </Container>
              </Form>
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            {strings.close}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
