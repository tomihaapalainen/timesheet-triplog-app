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
  endDate,
  setEndDate,
  lunchDuration,
  breakDuration,
  dailyAllowance,
  selectedProject,
  startHours,
  startMinutes,
  endHours,
  endMinutes,
  setStartHours,
  setStartMinutes,
  setEndHours,
  setEndMinutes,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { currentUser } = useAuth();

  const { language, isActive } = useGSC();
  strings.setLanguage(language);

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setStartHours(null);
    setStartMinutes(null);
    setEndHours(null);
    setEndMinutes(null);
  };

  const handleSave = async () => {
    if (!selectedProject) {
      setErrorMessage(strings.projectMustBeSelected);
      return;
    }

    let startDatetime = new Date(startDate.getTime());
    startDatetime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
    let endDatetime = new Date(endDate.getTime());
    endDatetime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
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
      setStartHours(null);
      setStartMinutes(null);
      setEndDate(null);
      setEndHours(null);
      setEndMinutes(null);
      localStorage.setItem("previous-project", selectedProject);
      localStorage.setItem("previous-lunch-break", lunchDuration);
      sessionStorage.removeItem("latest-workdata");
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
        delay={2000}
      >
        <Toast.Body className="center-flex flex-row">
          <p className="font-weight-bold mr-2" style={{ fontSize: 18 }}>
            {strings.worktimeSaved}
          </p>
          <FaCheckCircle color="white" size={30} />
        </Toast.Body>
      </Toast>
      {loading ? (
        <Row className="my-3">
          <Loading />
        </Row>
      ) : (
        <Container className="px-0 mx-0 center-flex flex-column">
          <Row className="my-3 w-100 mx-0 px-0">
            <Col xs={6} className="w-100 mx-0 px-1">
              <Button
                className="w-100 mx-0 px-1 font-weight-bold text-white"
                style={{ minWidth: "125px" }}
                onClick={handleReset}
                variant="warning"
                disabled={
                  startHours === null &&
                  startMinutes === null &&
                  endHours === null &&
                  endMinutes === null
                }
              >
                {strings.reset}
              </Button>
            </Col>
            <Col xs={6} className="w-100 mx-0 px-1">
              <Button
                className="w-100 mx-0 px-1 font-weight-bold"
                style={{ minWidth: "125px" }}
                onClick={handleSave}
                variant="success"
                disabled={
                  startHours === null ||
                  startMinutes === null ||
                  endHours === null ||
                  endMinutes === null ||
                  selectedProject === 0 ||
                  !isActive
                }
              >
                {strings.save}
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}
