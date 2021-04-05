import React from "react";
import Container from "react-bootstrap/Container";
import ProjectsAccordion from "./components/ProjectsAccordion";
import { useGSC } from "../store/GlobalStateProvider";
import WorkingTimesAccordion from "./components/WorkingTimesAccordion";
import ReferralAccordion from "./components/ReferralAccordion";
import FeedbackAccordion from "./components/FeedbackAccordion";
import ReviewAccordion from "./components/ReviewAccordion";
import ActiveUntil from "./components/ActiveUntil";
import DeleteUserAccordion from "./components/DeleteUserAccordion";

export default function UserDataPage() {
  const { isActive, activeUntil, projects, setProjects, workTimes, setTimesheets } = useGSC();

  return (
    <Container style={{ maxWidth: "500px" }}>
      <ActiveUntil isActive={isActive} activeUntil={activeUntil} />
      <ProjectsAccordion projects={projects} setProjects={setProjects} />
      <WorkingTimesAccordion workTimes={workTimes} setTimesheets={setTimesheets} />
      <ReferralAccordion />
      <FeedbackAccordion />
      <ReviewAccordion />
      <DeleteUserAccordion />
      <Container style={{ height: "100px" }} />
    </Container>
  );
}
