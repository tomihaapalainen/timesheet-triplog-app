import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useGSC } from "../../store/GlobalStateProvider";
import { useHistoryStateContext } from "../HistoryStateProvider";
import strings from "./strings";
import { baseUrl } from "../../config";
import { useAuth } from "../../contexts/AuthContext";

export default function EditWorkdata() {
  const { currentUser } = useAuth();
  const { projects } = useGSC();
  const {
    openWorkdata,
    setOpenWorkdata,
    currentWorkdata,
    setCurrentWorkdata,
  } = useHistoryStateContext();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const projectRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const lunchDurationRef = useRef();
  const breakDurationRef = useRef();
  const dailyAllowanceRef = useRef();

  const handleClose = () => {
    setOpenWorkdata(null);
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
        setOpenWorkdata(null);
      }
    } catch (error) {
    } finally {
      if (mounted) {
        setDeleting(false);
      }
    }
    return () => (mounted = false);
  };

  const handleSave = async () => {
    let project = projectRef.current.value;
    let start = startRef.current.value;
    let end = endRef.current.value;
    let lunch = lunchDurationRef.current.value;
    let breaks = breakDurationRef.current.value;
    let dailyAllowance = dailyAllowanceRef.current.value;

    if (isNaN(Date.parse(start))) {
      setErrorMessage(strings.checkStartDate);
      return;
    }

    if (isNaN(Date.parse(end))) {
      setErrorMessage(strings.checkEndDate);
      return;
    }

    setLoading(true);

    let data = {
      id: openWorkdata.id,
      start: start,
      end: end,
      project_id: project,
      lunch_duration: parseInt(lunch),
      break_duration: parseInt(breaks),
      daily_allowance: parseInt(dailyAllowance),
    };
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(`${baseUrl}/workdata/update`, data, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (response.status === 200) {
        setErrorMessage("");
        let idx = currentWorkdata.findIndex((w) => w.id === openWorkdata.id);
        setCurrentWorkdata([
          ...currentWorkdata.slice(0, idx),
          response.data,
          ...currentWorkdata.slice(idx + 1),
        ]);
        setOpenWorkdata(null);
      }
    } catch (error) {
      setErrorMessage(strings.unableToSaveWorkdata);
    } finally {
      setLoading(false);
    }
  };

  if (openWorkdata === null) {
    return <></>;
  }

  return (
    <Modal show onHide={handleClose}>
      <Modal.Body>
        <Form.Group style={{ fontSize: "16px" }}>
          <Form.Label className="p-0 mt-1 mb-0">{strings.project}</Form.Label>
          <Form.Control as="select" defaultValue={openWorkdata.project_id} ref={projectRef}>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.project_name}
              </option>
            ))}
          </Form.Control>
          <Form.Label className="p-0 mt-1 mb-0">{strings.start}</Form.Label>
          <Form.Control type="text" defaultValue={openWorkdata.start} ref={startRef} />
          <Form.Label className="p-0 mt-1 mb-0">{strings.end}</Form.Label>
          <Form.Control type="text" defaultValue={openWorkdata.end} ref={endRef} />
          <Form.Label className="p-0 mt-1 mb-0">{strings.lunchDuration}</Form.Label>
          <Form.Control
            type="number"
            defaultValue={openWorkdata.lunch_duration}
            ref={lunchDurationRef}
          />
          <Form.Label className="p-0 mt-1 mb-0">{strings.breakDuration}</Form.Label>
          <Form.Control
            type="number"
            defaultValue={openWorkdata.break_duration}
            ref={breakDurationRef}
          />
          <Form.Label className="p-0 mt-1 mb-0">{strings.dailyAllowance} (€)</Form.Label>
          <Form.Control
            type="number"
            defaultValue={openWorkdata.daily_allowance}
            ref={dailyAllowanceRef}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {errorMessage && <p className="lead text-warning">{errorMessage}</p>}
        {loading && <Spinner variant="warning" animation="border" role="status" />}
        {deleting && <Spinner variant="warning" animation="border" role="status" />}
        {!loading && !deleting && (
          <Button
            variant="danger"
            className="mx-1 px-1 mr-auto"
            onClick={() => handleDelete(openWorkdata.id)}
          >
            {strings.delete}
          </Button>
        )}
        {!loading && !deleting && (
          <Button variant="secondary" onClick={handleClose}>
            {strings.close}
          </Button>
        )}
        {!loading && !deleting && (
          <Button variant="primary" className="mx-1 px-2" onClick={handleSave}>
            {strings.save}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
