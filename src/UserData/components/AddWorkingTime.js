import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useGSC } from "../../store/GlobalStateProvider";
import { useAuth } from "../../contexts/AuthContext";
import { currentTime } from "../../utils/datetimeutils";
import { baseUrl } from "../../config";
import TimePicker from "react-rainbow-components/components/TimePicker";
import Loading from "../../shared/Loading";
import strings from "../../Timesheet/components/strings";
import "./styles.css";

export default function AddWorkingTime() {
  const { workTimes, setTimesheets, language, isActive } = useGSC();
  strings.setLanguage(language);

  const { currentUser } = useAuth();

  const [start, setStart] = useState(currentTime());
  const [end, setEnd] = useState(currentTime());
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddWorkingTime = async () => {
    setLoading(true);
    if (!start || !end) {
      return;
    }

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
            <TimePicker
              className="w-50"
              id="start-time-picker"
              value={start}
              label={strings.start}
              onChange={(t) => setStart(t)}
              placeholder="--"
              hour24
            />
            <TimePicker
              className="w-50"
              id="end-time-picker"
              value={end}
              label={strings.end}
              onChange={(t) => setEnd(t)}
              placeholder="--"
              hour24
            />
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
