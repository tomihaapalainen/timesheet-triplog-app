import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { useGSC } from "../../store/GlobalStateProvider";
import AccordionToggle from "../../shared/AccordionToggle";
import strings from "./strings";

export default function SavedTimesheets({ setStartDate, setStartTime, setEndDate, setEndTime }) {
  const { workTimes, language } = useGSC();

  strings.setLanguage(language);

  const handleSavedTimesheetClicked = (workTime) => {
    let date = new Date();
    setStartDate(date);
    setStartTime(workTime.start);
    setEndDate(date);
    setEndTime(workTime.end);
  };

  return (
    <Container className="px-0 mx-0">
      <Accordion className="mx-auto mw-1024">
        <Card>
          <AccordionToggle title={strings.quickSelect} />
          <Accordion.Collapse eventKey="0">
            <Card.Body className="mx-auto">
              <Row>
                {workTimes.length === 0 && (
                  <Col>
                    <p>{strings.noQuickSelections} </p>
                  </Col>
                )}
                {workTimes.length > 0 && (
                  <Col>
                    {workTimes
                      .sort((a, b) => (a.start < b.start ? -1 : 1))
                      .map((workTime) => (
                        <ListGroup.Item
                          key={`${workTime.start}${workTime.end}`}
                          action
                          onClick={() => handleSavedTimesheetClicked(workTime)}
                        >
                          {workTime.start} - {workTime.end}
                        </ListGroup.Item>
                      ))}
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}
