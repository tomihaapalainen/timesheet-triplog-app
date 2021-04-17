import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "../../shared/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import { FaDownload } from "react-icons/fa";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";
import { datetimeAsDateISOString } from "../../utils/datetimeutils";
import "./styles.css";

const fileDownload = require("js-file-download");

export default function DownloadControls({ start, end, selectedFormat, selectedProject }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFormatNotSelected, setShowFormatNotSelected] = useState(false);
  const { currentUser } = useAuth();

  const { language } = useGSC();
  strings.setLanguage(language);

  const handleDownloadTripLog = async () => {
    if (!selectedFormat) {
      setShowFormatNotSelected(true);
      return;
    }

    setErrorMessage("");
    setLoading(true);

    let data = {
      start: datetimeAsDateISOString(start),
      end: datetimeAsDateISOString(end),
      fmt: selectedFormat,
      project: selectedProject || 0,
      language: language,
    };

    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(`${baseUrl}/download-trip-report/`, data, {
        headers: { Authorization: `Bearer ${idToken}` },
        responseType: "blob",
      });

      if (response.status === 200) {
        fileDownload(response.data, `${strings.tripLog}.${selectedFormat}`);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage(
            `${strings.noTrips} ${start.getMonth() + 1}.${start.getFullYear()} - ${
              end.getMonth() + 1
            }.${end.getFullYear()}`
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTimesheets = async () => {
    if (!selectedFormat) {
      setShowFormatNotSelected(true);
      return;
    }
    setLoading(true);

    let data = {
      start: datetimeAsDateISOString(start),
      end: datetimeAsDateISOString(end),
      fmt: selectedFormat,
      project: selectedProject || 0,
      language: language,
    };

    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(`${baseUrl}/download-timesheets/`, data, {
        headers: { Authorization: `Bearer ${idToken}` },
        responseType: "blob",
      });

      if (response.status === 200) {
        fileDownload(response.data, `${strings.timesheet}.${selectedFormat}`);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage(strings.noTimesheets);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const getDisabled = () => {
    return start === null || end === null || !selectedFormat;
  };

  if (showFormatNotSelected) {
    return (
      <Alert
        show={showFormatNotSelected}
        variant="warning"
        className="mx-auto"
        style={{ width: "50%", minWidth: "260px" }}
      >
        <p>{strings.pleaseSelectReportFormat}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowFormatNotSelected(false)} variant="outline-warning">
            OK
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <Container>
      {loading ? (
        <Row className="download-controls-row">
          <Loading />
        </Row>
      ) : (
        <Row className="download-controls-row">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <Button
            disabled={getDisabled()}
            className="download-btn"
            onClick={handleDownloadTimesheets}
          >
            <Container>
              <p style={{ fontSize: "18px" }}>{strings.timesheetReport}</p>
              <FaDownload color="white" size={25} />
            </Container>
          </Button>
          <Button disabled={getDisabled()} className="download-btn" onClick={handleDownloadTripLog}>
            <Container fluid>
              <p style={{ fontSize: "18px" }}>{strings.tripLogBtn}</p>
              <FaDownload color="white" size={25} />
            </Container>
          </Button>
        </Row>
      )}
    </Container>
  );
}
