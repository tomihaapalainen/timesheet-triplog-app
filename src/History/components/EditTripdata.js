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

export default function EditTripdata() {
  const { currentUser } = useAuth();
  const { projects } = useGSC();
  const {
    openTripdata,
    setOpenTripdata,
    currentTripdata,
    setCurrentTripdata,
  } = useHistoryStateContext();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const projectRef = useRef();
  const vehicleRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const startKmRef = useRef();
  const endKmRef = useRef();
  const compensationRef = useRef();
  const routeRef = useRef();
  const descriptionRef = useRef();

  const handleClose = () => {
    setOpenTripdata(null);
  };

  const handleSave = async () => {
    let project = projectRef.current.value;
    let vehicle = vehicleRef.current.value;
    let startDatetime = startRef.current.value;
    let startKm = startKmRef.current.value;
    let endDatetime = endRef.current.value;
    let endKm = endKmRef.current.value;
    let compensation = compensationRef.current.value * 100;
    let route = routeRef.current.value;
    let description = descriptionRef.current.value;

    if (isNaN(Date.parse(startDatetime))) {
      setErrorMessage(strings.checkStartDate);
      return;
    }

    if (isNaN(Date.parse(endDatetime))) {
      setErrorMessage(strings.checkEndDate);
      return;
    }

    setLoading(true);

    let data = {
      id: openTripdata.id,
      vehicle: vehicle,
      start_datetime: startDatetime,
      end_datetime: endDatetime,
      project_id: project,
      start_km: startKm,
      end_km: endKm,
      compensation: compensation,
      description: description,
      route: route,
    };

    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(`${baseUrl}/trips/update`, data, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (response.status === 200) {
        setErrorMessage("");
        let idx = currentTripdata.findIndex((w) => w.id === openTripdata.id);
        setCurrentTripdata([
          ...currentTripdata.slice(0, idx),
          response.data,
          ...currentTripdata.slice(idx + 1),
        ]);
        setOpenTripdata(null);
      }
    } catch (error) {
      setErrorMessage(strings.unableToSaveTripdata);
    } finally {
      setLoading(false);
    }
  };

  if (openTripdata === null) {
    return <></>;
  }

  return (
    <Modal show onHide={handleClose}>
      <Modal.Body>
        <Form.Group style={{ fontSize: "16px" }}>
          <Form.Label className="p-0 mt-1 mb-0">{strings.project}</Form.Label>
          <Form.Control as="select" defaultValue={openTripdata.project_id} ref={projectRef}>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.project_name}
              </option>
            ))}
          </Form.Control>
          <Form.Label className="p-0 mt-1 mb-0">{strings.vehicle}</Form.Label>
          <Form.Control type="text" defaultValue={openTripdata.vehicle} ref={vehicleRef} />
          <Form.Label className="p-0 mt-1 mb-0">{strings.compensationPerKm}</Form.Label>
          <Form.Control
            type="text"
            defaultValue={openTripdata.compensation / 100}
            ref={compensationRef}
          />
          <Form.Label className="p-0 mt-1 mb-0">{strings.route}</Form.Label>
          <Form.Control type="text" defaultValue={openTripdata.route} ref={routeRef} />
          <Form.Label className="p-0 mt-1 mb-0">{strings.description}</Form.Label>
          <Form.Control type="text" defaultValue={openTripdata.description} ref={descriptionRef} />
          <Form.Label className="p-0 mt-1 mb-0">{strings.start}</Form.Label>
          <Form.Control type="text" defaultValue={openTripdata.start_datetime} ref={startRef} />
          <Form.Label className="p-0 mt-1 mb-0">{strings.end}</Form.Label>
          <Form.Control type="text" defaultValue={openTripdata.end_datetime} ref={endRef} />
          <Form.Label className="p-0 mt-1 mb-0">{strings.startKm}</Form.Label>
          <Form.Control type="text" defaultValue={openTripdata.start_km} ref={startKmRef} />
          <Form.Label className="p-0 mt-1 mb-0">{strings.endKm}</Form.Label>
          <Form.Control type="text" defaultValue={openTripdata.end_km} ref={endKmRef} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        {errorMessage && <p className="lead text-warning">{errorMessage}</p>}
        {loading && <Spinner variant="warning" animation="border" role="status" />}
        {!loading && (
          <Button variant="secondary" onClick={handleClose}>
            {strings.close}
          </Button>
        )}
        {!loading && (
          <Button variant="primary" onClick={handleSave}>
            {strings.save}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
