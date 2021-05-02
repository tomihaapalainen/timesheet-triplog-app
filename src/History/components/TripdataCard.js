import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useGSC } from "../../store/GlobalStateProvider";
import {
  datetimeAsDateString,
  datetimeAsTimeString,
  timestampToDate,
} from "../../utils/datetimeutils";
import { useHistoryStateContext } from "../HistoryStateProvider";
import strings from "./strings";
import { FaEdit } from "react-icons/fa";

export default function TripdataCard({ tripdata }) {
  const { language, projects } = useGSC();
  strings.setLanguage(language);

  const { setOpenTripdata } = useHistoryStateContext();

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
    <Card key={tripdata.id} className="mt-1">
      <Card.Header className="bg-primary text-white py-1">
        <Row>
          <Col xs={10} className="center-flex justify-content-start">
            <Card.Text>{getHeaderDates(tripdata.start_datetime, tripdata.end_datetime)}</Card.Text>
          </Col>
          <Col xs={2}>
            <Button className="m-0 p-1 mr-1" onClick={() => setOpenTripdata(tripdata)}>
              <FaEdit size={25} />
            </Button>{" "}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className="py-1">
        <Card.Text>{getHeaderTimes(tripdata.start_datetime, tripdata.end_datetime)}</Card.Text>
        <Card.Text>
          {strings.project}: {getProject(tripdata.project_id)}
        </Card.Text>
        <Card.Text>
          {strings.vehicle}: {tripdata.vehicle}
        </Card.Text>
        <Card.Text>
          {strings.route}: {tripdata.route}
        </Card.Text>
        <Card.Text>
          {strings.distance}: {tripdata.end_km - tripdata.start_km} km
        </Card.Text>
        <Card.Text>
          {strings.compensation}:{" "}
          {((tripdata.end_km - tripdata.start_km) * tripdata.compensation) / 100} €
        </Card.Text>
        {tripdata.description && (
          <Card.Text>
            {strings.description}: {tripdata.description}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}
