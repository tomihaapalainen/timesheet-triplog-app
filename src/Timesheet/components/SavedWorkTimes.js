import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useGSC } from "../../store/GlobalStateProvider";
import AccordionToggle from "../../shared/AccordionToggle";
import strings from "./strings";
import "./styles.css";

export default function SavedWorkTimes({
  startDate,
  endDate,
  setStartDate,
  setStartTime,
  setEndDate,
  setEndTime,
}) {
  const { workTimes, language } = useGSC();

  strings.setLanguage(language);

  const handleSavedTimesheetClicked = (workTime) => {
    let startingDate = startDate || new Date();
    let endingDate = endDate || new Date();

    setStartDate(startingDate);
    setStartTime(workTime.start);
    setEndDate(endingDate);
    setEndTime(workTime.end);
  };

  return (
    <Container className="px-0 mx-0">
      <Accordion className="mx-auto mw-1024">
        <Card>
          <AccordionToggle title={strings.quickSelect} />
          <Accordion.Collapse eventKey="0">
            <Card.Body className="mx-auto">
              {workTimes.length === 0 && (
                <Col>
                  <p>{strings.noQuickSelections} </p>
                </Col>
              )}
              {workTimes.length > 0 && (
                <Row className="mx-0 px-0">
                  <Col sm className="mx-0 px-0">
                    {workTimes
                      .sort((a, b) => (a.start < b.start ? -1 : 1))
                      .map((workTime) => (
                        <Button
                          className="p-2 text-center quick-select-btn"
                          key={`${workTime.start}${workTime.end}`}
                          action
                          onClick={() => handleSavedTimesheetClicked(workTime)}
                        >
                          {workTime.start} - {workTime.end}
                        </Button>
                      ))}
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}
