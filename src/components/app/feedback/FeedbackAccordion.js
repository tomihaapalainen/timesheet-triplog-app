import React, { useRef, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { baseUrl } from "../../../config";
import { useAuth } from "../../../contexts/AuthContext";
import AccordionToggle from "../../accordion/AccordionToggle";
import strings from "./strings";
import { useGSC } from "../../../store/GlobalStateProvider";

export default function FeedbackAccordion() {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [subjectMissing, setSubjectMissing] = useState(false);
  const [contentMissing, setContentMissing] = useState(false);

  const topicRef = useRef();
  const feedbackRef = useRef();

  const { currentUser } = useAuth();

  const { language } = useGSC();
  strings.setLanguage(language);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let subject = topicRef.current.value;
    let content = feedbackRef.current.value;

    if (!subject) {
      setSubjectMissing(true);
      return;
    }

    if (!content) {
      setContentMissing(true);
      return;
    }

    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(
        `${baseUrl}/feedback`,
        { subject: subject, content: content },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      if (response.status === 200) {
        setMessage(strings.thanksForTheFeedback);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(strings.errorSendingFeedback);
      }
    }
  };

  return (
    <Accordion className="mx-auto mw-1024">
      <Card>
        <AccordionToggle title={strings.sendFeedback} />
        <Accordion.Collapse eventKey="0">
          <Card.Body className="mx-auto">
            {message && (
              <Container className="my-3">
                <p>{message}</p>
              </Container>
            )}
            {errorMessage && (
              <Container className="my-3">
                <p className="text-danger">{errorMessage}</p>
              </Container>
            )}
            <Alert
              show={subjectMissing}
              variant="danger"
              dismissible
              onClose={() => setSubjectMissing(false)}
            >
              <p>{strings.chooseTopicForFeedback}</p>
            </Alert>
            <Alert
              show={contentMissing}
              variant="danger"
              dismissible
              onClose={() => setContentMissing(false)}
            >
              <p>{strings.feedbackCannotBeEmpty}</p>
            </Alert>
            {!message && !errorMessage && (
              <Form onSubmit={handleSubmit} className="d-flex flex-column">
                <Form.Group>
                  <Form.Label>{strings.subject + "*"}</Form.Label>
                  <Form.Control as="select" ref={topicRef} className="mb-3">
                    <option key="0" value=""></option>
                    <option key="1" value="suggestions">
                      {strings.suggestions}
                    </option>
                    <option key="2" value="complaints">
                      {strings.complaints}
                    </option>
                    <option key="3" value="other">
                      {strings.other}
                    </option>
                  </Form.Control>
                  <Form.Label>{strings.feedback}</Form.Label>
                  <Form.Control
                    ref={feedbackRef}
                    as="textarea"
                    style={{ resize: "none", height: "200px" }}
                    maxLength={255}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" className="mx-auto">
                  {strings.send}
                </Button>
              </Form>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
