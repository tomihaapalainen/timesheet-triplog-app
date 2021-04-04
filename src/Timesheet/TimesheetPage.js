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
import { timestampToDate } from "../utils/datetimeutils";
import TimesheetPageControls from "./components/TimesheetPageControls";

export default function TimesheetPage() {
  const [selectedProject, setSelectedProject] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [dailyAllowance, setDailyAllowance] = useState("");
  const [lunchDuration, setLunchDuration] = useState(0);
  const [breakDuration, setBreakDuration] = useState(0);

  useEffect(() => {
    getAndSetIfNotNull("current-start-date", (val) => setStartDate(timestampToDate(val)));
    getAndSetIfNotNull("current-start-time", (val) => setStartTime(val));
    getAndSetIfNotNull("current-end-date", (val) => setEndDate(timestampToDate(val)));
    getAndSetIfNotNull("current-end-time", (val) => setStartTime(val));
    getAndSetIfNotNull("previous-project", setSelectedProject);
    getAndSetIfNotNull("previous-lunch-break", setLunchDuration);
  }, []);

  return (
    <Container className="my-3 w-100" style={{ maxWidth: "500px" }}>
      <ProjectSelection project={selectedProject} setProject={setSelectedProject} required={true} />
      <SavedWorkTimes
        setStartDate={setStartDate}
        setStartTime={setStartTime}
        setEndDate={setEndDate}
        setEndTime={setEndTime}
      />
      <TimesheetSelect
        startDate={startDate}
        setStartDate={setStartDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endDate={endDate}
        setEndDate={setEndDate}
        endTime={endTime}
        setEndTime={setEndTime}
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
        setStartDate={setStartDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endDate={endDate}
        setEndDate={setEndDate}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <TimesheetSummary
        startDate={startDate || new Date()}
        startTime={startTime}
        endDate={endDate || new Date()}
        endTime={endTime}
        lunchDuration={lunchDuration}
        breakDuration={breakDuration}
      />
      <TimesheetPageControls
        startDate={startDate || new Date()}
        setStartDate={setStartDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endDate={endDate || new Date()}
        setEndDate={setEndDate}
        endTime={endTime}
        setEndTime={setEndTime}
        lunchDuration={lunchDuration}
        breakDuration={breakDuration}
        dailyAllowance={dailyAllowance}
        selectedProject={selectedProject}
      />
      <Container style={{ height: "100px" }} />
    </Container>
  );
}
