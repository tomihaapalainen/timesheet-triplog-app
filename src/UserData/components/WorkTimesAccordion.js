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
import AddWorkTime from "./AddWorkTime";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import AccordionToggle from "../../shared/AccordionToggle";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function WorkTimesAccordion({ workTimes, setWorkTimes }) {
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useAuth();

  const { language } = useGSC();
  strings.setLanguage(language);

  const handleRemove = async (worktimeId) => {
    let idToken = await currentUser.getIdToken(true);
    let response = await axios.delete(`${baseUrl}/worktimes/${worktimeId}`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });

    if (response.status === 200) {
      let newWorkTimes = workTimes.filter((w) => w.id !== worktimeId);
      setWorkTimes(newWorkTimes);
    } else {
      setErrorMessage(strings.removingWorktimeFailed);
    }
  };

  return (
    <Accordion className="mx-auto mw-1024">
      <Card>
        <AccordionToggle title={strings.quickSelection} />
        <Accordion.Collapse eventKey="0">
          <Card.Body className="mx-auto">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <ListGroup>
              {workTimes.map((w) => (
                <ListGroup.Item key={w.id}>
                  <Container>
                    <Row className="d-flex justify-content-center align-items-center">
                      <Col
                        xs={9}
                        sm={9}
                        md={9}
                        lg={9}
                        xl={9}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <p className="m-0 p-0">
                          {w.start} - {w.end}
                        </p>
                      </Col>
                      <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Button
                          className="d-flex justify-content-center align-items-center"
                          onClick={() => handleRemove(w.id)}
                        >
                          <FaTrashAlt size={25} color="#fff" />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <AddWorkTime />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
