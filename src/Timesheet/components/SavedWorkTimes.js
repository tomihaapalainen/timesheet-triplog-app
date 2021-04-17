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
  setEndDate,
  setStartHours,
  setStartMinutes,
  setEndHours,
  setEndMinutes,
}) {
  const { workTimes, language } = useGSC();

  strings.setLanguage(language);

  const handleSavedWorkTimeClicked = (workTime) => {
    let startingDate = startDate || new Date();
    let endingDate = endDate || new Date();

    setStartDate(startingDate);
    let [sHours, sMins] = workTime.start.split(":");
    setStartHours(sHours);
    setStartMinutes(sMins);
    setEndDate(endingDate);
    let [eHours, eMins] = workTime.end.split(":");
    setEndHours(eHours);
    setEndMinutes(eMins);
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
                <Row className="w-100 mx-0 px-0">
                  {workTimes
                    .sort((a, b) => (a.start < b.start ? -1 : 1))
                    .map((workTime) => (
                      <Col
                        xs={6}
                        sm={4}
                        className="mx-0 px-0"
                        key={`${workTime.start}${workTime.end}`}
                      >
                        <Button
                          className="p-1 text-center quick-select-btn"
                          onClick={() => handleSavedWorkTimeClicked(workTime)}
                        >
                          {workTime.start} - {workTime.end}
                        </Button>
                      </Col>
                    ))}
                </Row>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}
