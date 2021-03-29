import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useGSC } from "../../store/GlobalStateProvider";
import { useAuth } from "../../contexts/AuthContext";
import { datetimeAsTimeString } from "../../utils/datetimeutils";
import { baseUrl } from "../../config";
import TimePicker from "react-rainbow-components/components/TimePicker";
import Loading from "../../shared/Loading";
import strings from "../../Timesheet/components/strings";

export default function AddWorkingTime() {
  const [start, setStart] = useState(datetimeAsTimeString(new Date(), "HH:mm"));
  const [end, setEnd] = useState(datetimeAsTimeString(new Date(), "HH:mm"));
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const { workTimes, setTimesheets, language, isActive } = useGSC();

  strings.setLanguage(language);

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
    <Container
      className="mt-3"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {errorMessage && (
        <Container>
          <Row>
            <Col>
              <p className="text-danger">{errorMessage}</p>
            </Col>
          </Row>
        </Container>
      )}
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid lightgrey",
          borderRadius: "25px",
          padding: "15px",
        }}
      >
        <Col>
          <Row>
            <p className="mx-auto mb-3">{strings.addWorktime}</p>
          </Row>
          <Row>
            <TimePicker
              id="start-time-picker"
              value={start}
              label={strings.start}
              onChange={(t) => setStart(t)}
              placeholder="--"
              hour24
              style={{ width: "50%" }}
            />
            <TimePicker
              id="end-time-picker"
              value={end}
              label={strings.end}
              onChange={(t) => setEnd(t)}
              placeholder="--"
              hour24
              style={{ width: "50%" }}
            />
          </Row>
        </Col>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
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
