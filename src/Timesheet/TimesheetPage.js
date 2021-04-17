import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ProjectSelection from "../shared/ProjectSelection";
import WorkBreaks from "./components/WorkBreaks";
import TimesheetSelect from "./components/TimesheetSelect";
import TimesheetControls from "./components/TimesheetControls";
import SavedWorkTimes from "./components/SavedWorkTimes";
import DailyAllowance from "./components/DailyAllowance";
import TimesheetSummary from "./components/TimesheetSummary";
import { getAndSetIfNotNull } from "../utils/storageutils";
import { currentHours, currentMinutes, timestampToDate } from "../utils/datetimeutils";
import TimesheetPageControls from "./components/TimesheetPageControls";

export default function TimesheetPage() {
  const [selectedProject, setSelectedProject] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dailyAllowance, setDailyAllowance] = useState("");
  const [lunchDuration, setLunchDuration] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);

  const [startHours, setStartHours] = useState(null);
  const [startMinutes, setStartMinutes] = useState(null);
  const [endHours, setEndHours] = useState(null);
  const [endMinutes, setEndMinutes] = useState(null);

  useEffect(() => {
    getAndSetIfNotNull("current-start-date", (val) => setStartDate(timestampToDate(val)));
    getAndSetIfNotNull("current-end-date", (val) => setEndDate(timestampToDate(val)));
    getAndSetIfNotNull("previous-project", setSelectedProject);
    getAndSetIfNotNull("previous-lunch-break", setLunchDuration);
    getAndSetIfNotNull("current-start-hours", setStartHours);
    getAndSetIfNotNull("current-start-minutes", setStartMinutes);
    getAndSetIfNotNull("current-end-hours", setEndHours);
    getAndSetIfNotNull("current-end-minutes", setEndMinutes);
  }, []);

  const setStartingDate = (value) => {
    setStartDate(value);
    if (value !== null) {
      localStorage.setItem("current-start-date", value.toISOString());
    } else {
      localStorage.removeItem("current-start-date");
    }
  };

  const setEndingDate = (value) => {
    setEndDate(value);
    if (value !== null) {
      localStorage.setItem("current-end-date", value.toISOString());
    } else {
      localStorage.removeItem("current-end-date");
    }
  };

  const setStartingHours = (value) => {
    setStartHours(value);
    if (value !== null) {
      localStorage.setItem("current-start-hours", value);
    } else {
      localStorage.removeItem("current-start-hours");
    }
  };

  const setStartingMinutes = (value) => {
    setStartMinutes(value);
    if (value !== null) {
      localStorage.setItem("current-start-minutes", value);
    } else {
      localStorage.removeItem("current-start-minutes");
    }
  };

  const setEndingHours = (value) => {
    setEndHours(value);
    if (value !== null) {
      localStorage.setItem("current-end-hours", value);
    } else {
      localStorage.removeItem("current-end-hours");
    }
  };

  const setEndingMinutes = (value) => {
    setEndMinutes(value);
    if (value !== null) {
      localStorage.setItem("current-end-minutes", value);
    } else {
      localStorage.removeItem("current-end-minutes");
    }
  };

  return (
    <Container className="my-3 w-100" style={{ maxWidth: "500px" }}>
      <ProjectSelection project={selectedProject} setProject={setSelectedProject} required={true} />
      <SavedWorkTimes
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartingDate}
        setEndDate={setEndingDate}
        setStartHours={setStartingHours}
        setStartMinutes={setStartingMinutes}
        setEndHours={setEndingHours}
        setEndMinutes={setEndingMinutes}
      />
      <TimesheetSelect
        startDate={startDate}
        setStartDate={setStartingDate}
        endDate={endDate}
        setEndDate={setEndingDate}
        startHours={startHours || currentHours()}
        startMinutes={startMinutes || currentMinutes()}
        endHours={endHours || currentHours()}
        endMinutes={endMinutes || currentMinutes()}
        setStartHours={setStartingHours}
        setStartMinutes={setStartingMinutes}
        setEndHours={setEndingHours}
        setEndMinutes={setEndingMinutes}
      />
      <DailyAllowance dailyAllowance={dailyAllowance} setDailyAllowance={setDailyAllowance} />
      <WorkBreaks
        lunchDuration={lunchDuration}
        setLunchDuration={setLunchDuration}
        breakDuration={breakDuration}
        setBreakDuration={setBreakDuration}
      />
      <TimesheetControls
        startDate={startDate}
        setStartDate={setStartingDate}
        endDate={endDate}
        setEndDate={setEndingDate}
        startHours={startHours}
        startMinutes={startMinutes}
        endHours={endHours}
        endMinutes={endMinutes}
        setStartHours={setStartingHours}
        setStartMinutes={setStartingMinutes}
        setEndHours={setEndingHours}
        setEndMinutes={setEndingMinutes}
      />
      <TimesheetSummary
        startDate={startDate || new Date()}
        endDate={endDate || new Date()}
        lunchDuration={lunchDuration}
        breakDuration={breakDuration}
        startHours={startHours}
        startMinutes={startMinutes}
        endHours={endHours}
        endMinutes={endMinutes}
      />
      <TimesheetPageControls
        startDate={startDate || new Date()}
        setStartDate={setStartingDate}
        endDate={endDate || new Date()}
        setEndDate={setEndingDate}
        lunchDuration={lunchDuration}
        breakDuration={breakDuration}
        dailyAllowance={dailyAllowance}
        selectedProject={selectedProject}
        startHours={startHours}
        startMinutes={startMinutes}
        endHours={endHours}
        endMinutes={endMinutes}
        setStartHours={setStartingHours}
        setStartMinutes={setStartingMinutes}
        setEndHours={setEndingHours}
        setEndMinutes={setEndingMinutes}
      />
      <Container style={{ height: "100px" }} />
    </Container>
  );
}
