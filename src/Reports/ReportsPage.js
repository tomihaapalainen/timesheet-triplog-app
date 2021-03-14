import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import ReportFormatSelection from "./components/ReportFormatSelection";
import DateIntervalSelection from "./components/DateIntervalSelection";
import DownloadControls from "./components/DownloadControls";
import DateIntervalQuickSelect from "./components/DateIntervalQuickSelect";
import ProjectSelection from "../shared/ProjectSelection";

export default function ReportsPage() {
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  return (
    <Container className="mt-3" style={{ maxWidth: "500px" }}>
      <ProjectSelection
        project={selectedProject}
        setProject={setSelectedProject}
        required={false}
      />
      <DateIntervalQuickSelect setStart={setStart} setEnd={setEnd} />
      <DateIntervalSelection start={start} setStart={setStart} end={end} setEnd={setEnd} />
      <ReportFormatSelection
        selectedFormat={selectedFormat}
        setSelectedFormat={setSelectedFormat}
      />
      <DownloadControls
        start={start}
        end={end}
        selectedFormat={selectedFormat}
        selectedProject={selectedProject}
      />
      <Container style={{ height: "100px" }} />
    </Container>
  );
}
