import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import { datetimeAsDateISOString } from "../../utils/datetimeutils";
import strings from "./strings";
import Loading from "../../shared/Loading";
import { useGSC } from "../../store/GlobalStateProvider";
import { useHistoryStateContext } from "../HistoryStateProvider";
import WorkdataCard from "./WorkdataCard";

export default function WorkdataContainer() {
  const { currentUser } = useAuth();
  const { language } = useGSC();
  const { currentWorkdata, setCurrentWorkdata } = useHistoryStateContext();

  strings.setLanguage(language);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (start, end) => {
    setErrorMessage("");
    setLoading(true);
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(
        `${baseUrl}/workdata/interval`,
        {
          start: datetimeAsDateISOString(start),
          end: datetimeAsDateISOString(end),
        },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      if (response.status === 200) {
        setCurrentWorkdata(response.data);
        if (response.data.length === 0) {
          setErrorMessage(strings.noWorkdataFound);
        }
        return response.data;
      }
    } catch (error) {
      setErrorMessage(strings.unableToLoadWorkdata);
    } finally {
      setLoading(false);
    }
  };

  const fetchThisMonth = async () => {
    setErrorMessage("");
    let start = new Date();
    start.setDate(1);
    let end = new Date();
    await fetchData(start, end);
  };

  const fetchLastMonth = async () => {
    setErrorMessage("");
    let start = new Date();
    start.setDate(0);
    start.setDate(1);
    let end = new Date();
    end.setDate(0);
    await fetchData(start, end);
  };

  return (
    <Container className="mx-0 px-0">
      {!loading && (
        <Container fluid className="center-flex my-2 w-100">
          <Button onClick={fetchLastMonth} className="mr-2 w-100">
            {strings.lastMonth}
          </Button>
          <Button onClick={fetchThisMonth} className="w-100">
            {strings.thisMonth}
          </Button>
        </Container>
      )}
      {loading && <Loading />}
      {errorMessage && <p className="text-warning text-center lead my-3">{errorMessage}</p>}
      <Container fluid className="mx-0 px-0">
        {currentWorkdata
          .sort((a, b) => (a.start < b.start ? 1 : -1))
          .map((w) => (
            <WorkdataCard key={w.id} workdata={w} />
          ))}
      </Container>
      <Container className="center-flex py-3"></Container>
      <Container style={{ height: "50px" }} />
    </Container>
  );
}
