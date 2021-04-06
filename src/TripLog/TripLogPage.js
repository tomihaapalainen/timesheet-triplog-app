import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { baseUrl } from "../config";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import MeterInput from "./components/MeterInput";
import TripActions from "./components/TripActions";
import CancelTripModal from "./components/CancelTripModal";
import TripSummary from "./components/TripSummary";
import Loading from "../shared/Loading";
import { datetimeAsDateAndTimeString, datetimeToLocalISOString } from "../utils/datetimeutils";
import ProjectSelection from "../shared/ProjectSelection";
import strings from "./strings";
import { useGSC } from "../store/GlobalStateProvider";
import AddTripManually from "./components/AddTripManually";

export default function TripLogPage() {
  const [tripStart, setTripStart] = useState(null);
  const [tripEnd, setTripEnd] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [description, setDescription] = useState("");
  const [compensation, setCompensation] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [route, setRoute] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCancelStartDialog, setShowCancelStartDialog] = useState(false);
  const [showCancelEndDialog, setShowCancelEndDialog] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [kilometers, setKilometers] = useState([
    { count: 6, value: 0 },
    { count: 5, value: 0 },
    { count: 4, value: 0 },
    { count: 3, value: 0 },
    { count: 2, value: 0 },
    { count: 1, value: 0 },
  ]);

  const descriptionRef = useRef();
  const compensationRef = useRef();

  const { currentUser, signout } = useAuth();
  const history = useHistory();

  const { language, isActive } = useGSC();
  strings.setLanguage(language);

  const fetchLastTripData = async () => {
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.get(`${baseUrl}/trips/last`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (response.status === 200) {
        setCurrentKilometers(response.data.end_km);
        setVehicle(response.data.vehicle);
        setSelectedProject(response.data.project_id);
        setCompensation(response.data.compensation / 100);
        sessionStorage.setItem("last-trip-data", JSON.stringify(response.data));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          signout();
          history.push("/login-again");
        } else if (error.response.status !== 404) {
          setErrorMessage(error.response.data.detail);
        }
      }
    }
  };

  const checkStartedTrips = () => {
    let tripOngoing = false;
    let tripStart = localStorage.getItem("trip-start");
    if (tripStart !== null) {
      let data = JSON.parse(localStorage.getItem("trip-start"));
      data.datetime = new Date(Date.parse(data.datetime));
      setCurrentKilometers(data.meterValue.toString());
      setSelectedProject(data.projectId);
      setDescription(data.description);
      setCompensation(data.compensation / 100);
      setVehicle(data.vehicle);
      setRoute(data.route);
      setTripStart(data);
      tripOngoing = true;
    }

    let tripEnd = localStorage.getItem("trip-end");
    if (tripEnd !== null) {
      let data = JSON.parse(localStorage.getItem("trip-end"));
      data.datetime = new Date(Date.parse(data.datetime));
      setCurrentKilometers(data.meterValue.toString());
      setSelectedProject(data.projectId);
      setDescription(data.description);
      setCompensation(data.compensation / 100);
      setVehicle(data.vehicle);
      setRoute(data.route);
      setTripEnd(data);
      tripOngoing = true;
    }

    return tripOngoing;
  };

  const checkLastTripData = async () => {
    let lastTripData = sessionStorage.getItem("last-trip-data");
    if (lastTripData !== null) {
      let data = JSON.parse(lastTripData);
      setCurrentKilometers(data.end_km);
      setVehicle(data.vehicle);
      setSelectedProject(data.project_id);
      setCompensation(data.compensation / 100);
    } else {
      await fetchLastTripData();
    }
  };

  useEffect(() => {
    let tripOngoing = checkStartedTrips();
    if (!tripOngoing) {
      checkLastTripData();
    }
    setInitializing(false);
  }, []);

  const setCurrentKilometers = (newValue) => {
    newValue = ("000000" + newValue).slice(-6);
    let newKilometers = [];
    for (let i = 0; i < 6; i++) {
      newKilometers.push({ count: 6 - i, value: parseInt(newValue[i]) });
    }
    setKilometers(newKilometers);
  };

  const parseKilometers = () => {
    return parseInt(kilometers.map((km) => km.value).join(""));
  };

  const handleTripStart = () => {
    setTripData(null);
    let data = {
      datetime: new Date(),
      projectId: selectedProject,
      meterValue: parseKilometers(),
      description: descriptionRef.current.value,
      compensation: parseFloat(compensationRef.current.value) * 100,
      vehicle: vehicle,
      route: route,
    };
    setTripStart(data);
    localStorage.setItem("trip-start", JSON.stringify(data));
  };

  const handleTripEnd = () => {
    let data = {
      datetime: new Date(),
      projectId: selectedProject,
      meterValue: parseKilometers(),
      description: descriptionRef.current.value,
      compensation: parseFloat(compensationRef.current.value) * 100,
      vehicle: vehicle,
      route: route,
    };
    setTripEnd(data);
    localStorage.setItem("trip-end", JSON.stringify(data));
  };

  const handleSubmit = async () => {
    setLoading(true);

    let compensationAmount = compensationRef.current.value;

    let tripData = {
      vehicle: vehicle,
      project_id: selectedProject,
      start_km: tripStart.meterValue,
      start_datetime: datetimeToLocalISOString(tripStart.datetime),
      end_km: tripEnd.meterValue,
      end_datetime: datetimeToLocalISOString(tripEnd.datetime),
      compensation: parseFloat(compensationAmount) * 100,
      description: descriptionRef.current.value,
      route: route,
    };

    currentUser.getIdToken(true).then((idToken) => {
      axios
        .post(`${baseUrl}/trips`, tripData, {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setTripData(response.data);
            setTripEnd(null);
            localStorage.removeItem("trip-end");
            setTripStart(null);
            localStorage.removeItem("trip-start");
            sessionStorage.removeItem("last-trip-data");
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              signout();
              history.push("/");
            } else if (error.response.status === 402) {
              setErrorMessage(strings.accountNoLongerActive);
            } else {
              setErrorMessage(strings.errorSavingTrip);
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const getDisabled = () => {
    return vehicle ? {} : { disabled: true };
  };

  const getEndDisabled = () => {
    return parseKilometers() <= tripStart.meterValue ? { disabled: true } : {};
  };

  const getSaveDisabled = () => {
    return !vehicle || !selectedProject || !isActive || !route || !compensationRef.current.value
      ? { disabled: true }
      : {};
  };

  const handleCancelStart = () => {
    setTripStart(null);
    localStorage.removeItem("trip-start");
    setShowCancelStartDialog(false);
  };

  const handleCancelEnd = () => {
    setTripEnd(null);
    localStorage.removeItem("trip-end");
    setShowCancelEndDialog(false);
  };

  const onVehicleChanged = (e) => {
    setVehicle(e.target.value.toUpperCase());
  };

  return (
    <Container className="my-3" style={{ maxWidth: "500px" }}>
      {errorMessage && (
        <Container>
          <Row>
            <Col>
              <p className="text-danger">{errorMessage}</p>
            </Col>
          </Row>
        </Container>
      )}
      <ProjectSelection project={selectedProject} setProject={setSelectedProject} required={true} />
      <Container fluid className="d-flex flex-row mb-3 mx-0 px-0">
        <Col className="w-100 mx-0 px-0" xs={7}>
          <Form.Control
            value={vehicle}
            onChange={onVehicleChanged}
            type="text"
            onFocus={(event) => event.target.select()}
            onKeyUp={(event) => {
              if (event.key === "Enter") event.target.blur();
            }}
            placeholder={strings.vehicle + "*"}
          />
        </Col>
        <Col className="w-100 mx-0 px-0" xs={5}>
          <InputGroup>
            <Form.Control
              defaultValue={compensation}
              ref={compensationRef}
              placeholder={strings.compensation + "*"}
              type="number"
            />
            <InputGroup.Append>
              <InputGroup.Text className="mx-0 px-1">€/km</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Container>

      <Form.Control
        className="mb-3"
        type="text"
        placeholder={strings.route + "*"}
        onChange={(event) => setRoute(event.target.value)}
        value={route}
      />
      <Form.Control
        className="mb-3"
        type="text"
        placeholder={strings.description}
        ref={descriptionRef}
        defaultValue={description}
      />
      <AddTripManually
        route={route}
        kilometers={kilometers}
        selectedProject={selectedProject}
        vehicle={vehicle}
        descriptionRef={descriptionRef}
        compensationRef={compensationRef}
        setTripData={setTripData}
      />
      <MeterInput kilometers={kilometers} setCurrentKilometers={setCurrentKilometers} />
      {!isActive && <p className="text-danger">{strings.accountNoLongerActive}</p>}
      {!loading && (
        <TripActions
          tripStart={tripStart}
          tripEnd={tripEnd}
          handleStart={handleTripStart}
          handleEnd={handleTripEnd}
          getDisabled={getDisabled}
          getEndDisabled={getEndDisabled}
          getSaveDisabled={getSaveDisabled}
          setShowCancelStartDialog={setShowCancelStartDialog}
          setShowCancelEndDialog={setShowCancelEndDialog}
          handleSubmit={handleSubmit}
        />
      )}
      {(loading || initializing) && <Loading />}
      {!loading && !tripData && tripStart && (
        <Container className="my-3">
          <Row>
            <Col>
              <p className="my-0 py-0">
                {strings.tripStarted}: {datetimeAsDateAndTimeString(tripStart.datetime, language)}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="my-0 py-0">
                {strings.kilometerage}: {tripStart.meterValue}
              </p>
            </Col>
          </Row>
        </Container>
      )}
      {!loading && !tripData && tripEnd && (
        <Container>
          <Row>
            <Col>
              <p className="my-0 py-0">
                {strings.tripEnded}: {datetimeAsDateAndTimeString(tripEnd.datetime, language)}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="my-0 py-0">
                {strings.kilometerage}: {tripEnd.meterValue}
              </p>
            </Col>
          </Row>
        </Container>
      )}
      {!loading && tripData && <TripSummary tripData={tripData} />}
      <CancelTripModal
        open={showCancelStartDialog}
        operation={handleCancelStart}
        close={() => setShowCancelStartDialog(false)}
      />
      <CancelTripModal
        operation={handleCancelEnd}
        open={showCancelEndDialog}
        close={() => setShowCancelEndDialog(false)}
      />
      <Container style={{ height: "100px" }} />
    </Container>
  );
}
