import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import ReportFormatSelection from "../../components/app/reports/ReportFormatSelection";
import ProjectSelection from "../../components/app/work/ProjectSelection";
import DateIntervalSelection from "../../components/app/reports/DateIntervalSelection";
import DownloadControls from "../../components/app/reports/DownloadControls";
import DateIntervalQuickSelect from "../../components/app/reports/DateIntervalQuickSelect";

export default function DownloadReports() {
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
    </Container>
  );
}
