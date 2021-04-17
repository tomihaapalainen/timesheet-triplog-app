import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useGSC } from "../../store/GlobalStateProvider";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import Loading from "../../shared/Loading";
import TimePicker from "../../shared/TimePicker";
import strings from "../../Timesheet/components/strings";
import "./styles.css";
import { currentHours, currentMinutes } from "../../utils/datetimeutils";

export default function AddWorkingTime() {
  const { workTimes, setTimesheets, language, isActive } = useGSC();
  strings.setLanguage(language);

  const { currentUser } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [startHours, setStartHours] = useState(null);
  const [startMinutes, setStartMinutes] = useState(null);
  const [endHours, setEndHours] = useState(null);
  const [endMinutes, setEndMinutes] = useState(null);

  const handleAddWorkingTime = async () => {
    setLoading(true);
    if (!(startHours && startMinutes) || !(endHours && endMinutes)) {
      return;
    }

    let start = `${startHours}:${startMinutes}`;
    let end = `${endHours}:${endMinutes}`;

    let sameTime = workTimes.filter((w) => w.start === start && w.end === end);
    if (sameTime.length > 0) {
      setErrorMessage(strings.timeAlreadyAdded);
      setLoading(false);
      return;
    }

    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(
        `${baseUrl}/worktimes`,
        { start: start, end: end },
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      let newTimesheets = [...workTimes, response.data];
      setTimesheets(newTimesheets);
    } catch (error) {
      setErrorMessage(strings.addingWorktimeFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-3 center-flex flex-column">
      {errorMessage && (
        <Container>
          <Row>
            <Col>
              <p className="text-danger">{errorMessage}</p>
            </Col>
          </Row>
        </Container>
      )}
      <Row className="center-flex flex-row add-working-time-row">
        <Col>
          <Row>
            <Col>
              <TimePicker
                label={strings.start}
                minsId="working-time-start-mins-input"
                hours={startHours || currentHours()}
                minutes={startMinutes || currentMinutes()}
                setHours={setStartHours}
                setMinutes={setStartMinutes}
              />
            </Col>
            <Col>
              <TimePicker
                label={strings.end}
                minsId="working-time-end-mins-input"
                hours={endHours || currentHours()}
                minutes={endMinutes || currentMinutes()}
                setHours={setEndHours}
                setMinutes={setEndMinutes}
              />
            </Col>
          </Row>
        </Col>
        <Container className="center-flex flex-column mt-2">
          {loading ? (
            <Loading />
          ) : (
            <Button
              onClick={handleAddWorkingTime}
              disabled={!isActive}
              type="submit"
              className="bg-primary border-primary"
            >
              {strings.add}
            </Button>
          )}
        </Container>
      </Row>
    </Container>
  );
}
