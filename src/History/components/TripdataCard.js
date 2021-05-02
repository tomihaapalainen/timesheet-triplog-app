import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { baseUrl } from "../../config";
import { useAuth } from "../../contexts/AuthContext";
import { useGSC } from "../../store/GlobalStateProvider";
import {
  datetimeAsDateString,
  datetimeAsTimeString,
  timestampToDate,
} from "../../utils/datetimeutils";
import { useHistoryStateContext } from "../HistoryStateProvider";
import strings from "./strings";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function TripdataCard({ tripdata }) {
  const { language, projects } = useGSC();
  strings.setLanguage(language);

  const { currentTripdata, setCurrentTripdata, setOpenTripdata } = useHistoryStateContext();

  const { currentUser } = useAuth();

  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async (tripdataId) => {
    let mounted = true;
    setDeleting(true);
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.delete(`${baseUrl}/trips/delete/${tripdataId}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (response.status === 200) {
        let filteredTripdata = currentTripdata.filter((t) => t.id !== tripdataId);
        setCurrentTripdata(filteredTripdata);
      }
    } catch (error) {
    } finally {
      if (mounted) {
        setDeleting(false);
      }
    }
    return () => (mounted = false);
  };

  return (
    <Card key={tripdata.id} className="mt-1">
      <Card.Header className="bg-primary text-white py-1">
        <Row>
          <Col xs={8}>
            <Card.Text>{getHeaderDates(tripdata.start_datetime, tripdata.end_datetime)}</Card.Text>
          </Col>
          <Col xs={4} className="d-flex">
            {deleting && <Spinner variant="warning" animation="border" role="status" />}
            {!deleting && (
              <Button className="m-0 p-1 mr-1 ml-auto" onClick={() => setOpenTripdata(tripdata)}>
                <FaEdit size={25} />
              </Button>
            )}
            {!deleting && (
              <Button onClick={() => handleDelete(tripdata.id)} className="m-0 p-0 ml-auto">
                <FaTrashAlt size={25} />
              </Button>
            )}
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
