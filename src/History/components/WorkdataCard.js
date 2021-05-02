import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useGSC } from "../../store/GlobalStateProvider";
import { useHistoryStateContext } from "../HistoryStateProvider";
import {
  datetimeAsDateString,
  datetimeAsTimeString,
  timestampToDate,
} from "../../utils/datetimeutils";
import strings from "./strings";
import { FaEdit } from "react-icons/fa";

export default function WorkdataCard({ workdata }) {
  const { language, projects } = useGSC();
  strings.setLanguage(language);

  const { setOpenWorkdata } = useHistoryStateContext();

  const getHeaderDates = (start, end) => {
    let startDate = timestampToDate(start);
    let endDate = timestampToDate(end);

    let startDateString = datetimeAsDateString(startDate, language);
    let endDateString = datetimeAsDateString(endDate, language);

    if (startDateString !== endDateString) {
      startDateString += ` - ${endDateString}`;
    }

    return startDateString;
  };

  const getHeaderTimes = (start, end) => {
    return `${datetimeAsTimeString(timestampToDate(start), language)} - ${datetimeAsTimeString(
      timestampToDate(end),
      language
    )}`;
  };

  const getProject = (projectId) => {
    let project = projects.filter((p) => p.id === projectId)[0];
    return project.project_name;
  };

  return (
    <Card className="mt-1">
      <Card.Header className="bg-primary text-white py-1">
        <Row>
          <Col xs={10} className="center-flex justify-content-start">
            <Card.Text>{getHeaderDates(workdata.start, workdata.end)}</Card.Text>
          </Col>
          <Col xs={2}>
            <Button className="m-0 p-1 mr-1 ml-auto" onClick={() => setOpenWorkdata(workdata)}>
              <FaEdit size={25} />
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className="py-1">
        <Card.Text>{getHeaderTimes(workdata.start, workdata.end)}</Card.Text>
        <Card.Text>
          {strings.project}: {getProject(workdata.project_id)}
        </Card.Text>
        {workdata.lunch_duration > 0 && (
          <Card.Text>
            {strings.lunch}: {workdata.lunch_duration} min
          </Card.Text>
        )}
        {workdata.break_duration > 0 && (
          <Card.Text>
            {strings.breaks}: {workdata.break_duration} min
          </Card.Text>
        )}
        {workdata.daily_allowance > 0 && (
          <Card.Text>
            {strings.dailyAllowance}: {workdata.daily_allowance} €
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}
