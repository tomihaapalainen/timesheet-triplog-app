import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useGSC } from "../../store/GlobalStateProvider";
import { useHistoryStateContext } from "../HistoryStateProvider";
import {
  datetimeAsDateString,
  datetimeAsTimeString,
  timestampToDate,
} from "../../utils/datetimeutils";
import strings from "./strings";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../../config";
import { useAuth } from "../../contexts/AuthContext";

export default function WorkdataCard({ workdata }) {
  const { language, projects } = useGSC();
  strings.setLanguage(language);

  const { currentUser } = useAuth();
  const { currentWorkdata, setCurrentWorkdata } = useHistoryStateContext();
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

  const handleDelete = async (workdataId) => {
    let mounted = true;
    setDeleting(true);
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.delete(`${baseUrl}/workdata/delete/${workdataId}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (response.status === 200) {
        let filteredWorkdata = currentWorkdata.filter((w) => w.id !== workdataId);
        setCurrentWorkdata(filteredWorkdata);
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
    <Card className="mt-1">
      <Card.Header className="bg-primary text-white py-1">
        <Row>
          <Col xs={10} className="d-flex justify-content-flex-start align-items-center">
            <Card.Text>{getHeaderDates(workdata.start, workdata.end)}</Card.Text>
          </Col>
          <Col xs={2} className="d-flex">
            {deleting && <Spinner variant="warning" animation="border" role="status" />}
            {!deleting && (
              <Button onClick={() => handleDelete(workdata.id)} className="m-0 p-0 ml-auto">
                <FaTrashAlt size={25} />
              </Button>
            )}
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
            {strings.lunch}: {workdata.lunch_duration}
          </Card.Text>
        )}
        {workdata.break_duration > 0 && (
          <Card.Text>
            {strings.breaks}: {workdata.break_duration}
          </Card.Text>
        )}
        {workdata.daily_allowance > 0 && (
          <Card.Text>
            {strings.dailyAllowance}: {workdata.daily_allowance}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}
