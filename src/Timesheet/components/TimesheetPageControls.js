import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import Loading from "../../shared/Loading";
import { FaCheckCircle } from "react-icons/fa";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";
import "./styles.css";
import { datetimeToLocalISOString } from "../../utils/datetimeutils";

export default function TimesheetPageControls({
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
  lunchDuration,
  breakDuration,
  dailyAllowance,
  selectedProject,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { currentUser } = useAuth();

  const { language, isActive } = useGSC();
  strings.setLanguage(language);

  const handleReset = () => {
    setStartDate(null);
    setStartTime(null);
    setEndDate(null);
    setEndTime(null);
    localStorage.removeItem("current-start-date");
    localStorage.removeItem("current-start-time");
    localStorage.removeItem("current-end-date");
    localStorage.removeItem("current-end-time");
  };

  const handleSave = async () => {
    if (!selectedProject) {
      setErrorMessage(strings.projectMustBeSelected);
      return;
    }

    let [startHours, startMins] = startTime.match(/\d\d/gi);
    let [endHours, endMins] = endTime.match(/\d\d/gi);
    let startDatetime = new Date(startDate.getTime());
    startDatetime.setHours(parseInt(startHours), parseInt(startMins), 0, 0);
    let endDatetime = new Date(endDate.getTime());
    endDatetime.setHours(parseInt(endHours), parseInt(endMins), 0, 0);
    let allowance = parseInt(dailyAllowance);
    allowance = isNaN(allowance) ? 0 : allowance;

    setErrorMessage("");
    setShowSuccess(false);
    setLoading(true);
    let data = {
      start: datetimeToLocalISOString(startDatetime),
      end: datetimeToLocalISOString(endDatetime),
      project_id: selectedProject,
      lunch_duration: lunchDuration,
      break_duration: breakDuration,
      daily_allowance: allowance,
    };

    try {
      let idToken = await currentUser.getIdToken(true);
      await axios.post(`${baseUrl}/workdata`, data, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      setStartDate(null);
      setStartTime(null);
      setEndDate(null);
      setEndTime(null);
      localStorage.removeItem("current-start-date");
      localStorage.removeItem("current-start-time");
      localStorage.removeItem("current-end-date");
      localStorage.removeItem("current-end-time");
      localStorage.setItem("previous-project", selectedProject);
      localStorage.setItem("previous-lunch-break", lunchDuration);
      setShowSuccess(true);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage(strings.selectedProjectNotFound);
        } else if (error.response.status === 402) {
          setErrorMessage(strings.accountNoLongerActive);
        } else {
          setErrorMessage(strings.savingWorktimeFailed);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="px-0 mx-0 center-flex flex-column">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {!isActive && <p className="text-danger">{strings.accountNoLongerActive}</p>}
      <Toast
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        variant="success"
        className="bg-success text-white toast"
        autohide
        delay={2500}
      >
        <Toast.Body className="center-flex h-100">
          <Row>
            <Col xs={10}>
              <p className="font-weight-bold" style={{ fontSize: 18 }}>
                {strings.worktimeSaved}
              </p>
            </Col>
            <Col xs={2}>
              <FaCheckCircle color="white" size={30} />
            </Col>
          </Row>
        </Toast.Body>
      </Toast>
      {loading ? (
        <Row className="my-3">
          <Loading />
        </Row>
      ) : (
        <Row className="my-3">
          <Col xs={6} className="d-flex justify-content-end">
            <Button onClick={handleReset}>{strings.reset}</Button>
          </Col>
          <Col xs={6}>
            <Button
              onClick={handleSave}
              disabled={startTime === null || endTime === null || !selectedProject || !isActive}
            >
              {strings.save}
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}
