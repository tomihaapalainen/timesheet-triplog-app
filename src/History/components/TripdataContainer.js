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
import TripdataCard from "./TripdataCard";
import { useHistoryStateContext } from "../HistoryStateProvider";
import EditTripdata from "./EditTripdata";

export default function TripdataContainer() {
  const { currentUser } = useAuth();
  const { language } = useGSC();

  strings.setLanguage(language);

  const { currentTripdata, setCurrentTripdata } = useHistoryStateContext();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (start, end) => {
    setErrorMessage("");
    setLoading(true);
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(
        `${baseUrl}/trips/interval`,
        {
          start: datetimeAsDateISOString(start),
          end: datetimeAsDateISOString(end),
        },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      if (response.status === 200) {
        setCurrentTripdata(response.data);
        if (response.data.length === 0) {
          setErrorMessage(strings.noTripdataFound);
        }
        return response.data;
      }
    } catch (error) {
      setErrorMessage(strings.unableToLoadTripdata);
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
      <EditTripdata />
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
      {currentTripdata
        .sort((a, b) => (a.start_datetime < b.start_datetime ? 1 : -1))
        .map((t) => (
          <TripdataCard key={t.id} tripdata={t} />
        ))}
      <Container className="center-flex py-3"></Container>
      <Container style={{ height: "50px" }} />
    </Container>
  );
}
