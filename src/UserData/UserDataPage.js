import React from "react";
import Container from "react-bootstrap/Container";
import ProjectsAccordion from "./components/ProjectsAccordion";
import { useGSC } from "../store/GlobalStateProvider";
import WorkTimesAccordion from "./components/WorkTimesAccordion";
import ReferralAccordion from "./components/ReferralAccordion";
import FeedbackAccordion from "./components/FeedbackAccordion";
import ReviewAccordion from "./components/ReviewAccordion";
import ActiveUntil from "./components/ActiveUntil";
import DeleteUserAccordion from "./components/DeleteUserAccordion";

export default function UserDataPage() {
  const { activeUntil, projects, setProjects, workTimes, setWorkTimes } = useGSC();

  return (
    <Container style={{ maxWidth: "500px" }}>
      <ActiveUntil activeUntil={activeUntil} />
      <ProjectsAccordion projects={projects} setProjects={setProjects} />
      <WorkTimesAccordion workTimes={workTimes} setWorkTimes={setWorkTimes} />
      <ReferralAccordion />
      <FeedbackAccordion />
      <ReviewAccordion />
      <DeleteUserAccordion />
      <Container style={{ height: "100px" }} />
    </Container>
  );
}
