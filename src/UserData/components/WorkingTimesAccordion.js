import React, { useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import AddWorkingTime from "./AddWorkingTime";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import AccordionToggle from "../../shared/AccordionToggle";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";
import WorkTimeListItem from "./WorkTimeListItem";

export default function WorkingTimesAccordion({ workTimes, setTimesheets }) {
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
      let newTimesheets = workTimes.filter((w) => w.id !== worktimeId);
      setTimesheets(newTimesheets);
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
                  <WorkTimeListItem handleRemove={handleRemove} workTime={w} />
                </ListGroup.Item>
              ))}
            </ListGroup>
            <AddWorkingTime />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
