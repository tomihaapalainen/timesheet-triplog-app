import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "../../loading/Loading";
import { useAuth } from "../../../contexts/AuthContext";
import { baseUrl } from "../../../config";
import { FaDownload } from "react-icons/fa";
import strings from "./strings";
import { useGSC } from "../../../store/GlobalStateProvider";
import { datetimeAsDateString } from "../../../utils/datetimeutils";

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

    setLoading(true);

    let data = {
      start: datetimeAsDateString(start, "YYYY-MM-DD"),
      end: datetimeAsDateString(end, "YYYY-MM-DD"),
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
            `${
              strings.noTrips
            } ${start.getMonth()}.${start.getFullYear()} - ${end.getMonth()}.${end.getFullYear()}`
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
      start: datetimeAsDateString(start, "YYYY-MM-DD"),
      end: datetimeAsDateString(end, "YYYY-MM-DD"),
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
          setErrorMessage(strings.noWorkTimes);
        }
      }
    } finally {
      setLoading(false);
    }
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
        <Loading />
      ) : (
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <Button
            style={{ width: "90%", maxWidth: "240px" }}
            className="my-3 py-2"
            onClick={handleDownloadTimesheets}
          >
            <Row>
              <Col xs={9}>
                <p className="pr-4">{strings.timesheetReport}</p>
              </Col>
              <Col xs={3} className="m-0 p-0">
                <FaDownload color="white" size={15} />
              </Col>
            </Row>
          </Button>
          <Button
            style={{ width: "90%", maxWidth: "240px" }}
            className="my-3 py-2"
            onClick={handleDownloadTripLog}
          >
            <Row>
              <Col xs={9}>
                <p className="pr-4">{strings.tripLogBtn}</p>
              </Col>
              <Col xs={3} className="m-0 p-0">
                <FaDownload color="white" size={15} />
              </Col>
            </Row>
          </Button>
        </Row>
      )}
    </Container>
  );
}
