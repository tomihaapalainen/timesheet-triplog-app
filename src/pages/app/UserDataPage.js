import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import ProjectsAccordion from "../../components/app/work/ProjectsAccordion";
import { useGSC } from "../../store/GlobalStateProvider";
import { useAuth } from "../../contexts/AuthContext";
import WorkTimesAccordion from "../../components/app/work/WorkTimesAccordion";
import ReferralAccordion from "../../components/app/referral/ReferralAccordion";
import FeedbackAccordion from "../../components/app/feedback/FeedbackAccordion";
import ReviewAccordion from "../../components/app/feedback/ReviewAccordion";
import ActiveUntil from "../../components/app/userdata/ActiveUntil";
import { baseUrl } from "../../config";
import Loading from "../../components/loading/Loading";
import DeleteUserAccordion from "../../components/app/userdata/DeleteUserAccordion";

export default function UserDataPage() {
  const [review, setReview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const { activeUntil, projects, setProjects, workTimes, setWorkTimes } = useGSC();

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let idToken = await currentUser.getIdToken(true);
        let response = await axios.get(`${baseUrl}/review`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        setReview(response.data);
        sessionStorage.setItem("user-review", JSON.stringify(response.data));
      } catch (error) {
        if (error.response) {
          setErrorMessage("Palvelimeen ei saatu yhteyttä. Ole hyvä ja yritä myöhemmin uudelleen.");
        }
      }
    };

    let reviewData = sessionStorage.getItem("user-review");
    if (reviewData !== null) {
      setReview(JSON.parse(reviewData));
    } else {
      fetchData();
    }
    setLoading(false);
  }, []);

  return (
    <Container style={{ maxWidth: "500px" }}>
      {errorMessage && (
        <Container>
          <p className="text-warning">{errorMessage}</p>
        </Container>
      )}
      <ActiveUntil activeUntil={activeUntil} />
      <ProjectsAccordion projects={projects} setProjects={setProjects} />
      <WorkTimesAccordion workTimes={workTimes} setWorkTimes={setWorkTimes} />
      <ReferralAccordion />
      <FeedbackAccordion />
      {loading ? <Loading /> : <ReviewAccordion review={review} />}
      <DeleteUserAccordion />
    </Container>
  );
}
