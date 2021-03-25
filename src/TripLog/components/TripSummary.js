import React from "react";
import Container from "react-bootstrap/Container";
import { datetimeAsDateAndTimeString } from "../../utils/datetimeutils";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function TripSummary({ tripData }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const calculateDistance = (start, end) => {
    return parseInt(end) - parseInt(start);
  };

  return (
    <Container className="px-0 mx-0" style={{ maxWidth: "720px" }}>
      <p style={{ fontWeight: "bold", textDecoration: "underline" }}>{strings.summary}:</p>
      <p>
        {strings.vehicle}: {tripData.vehicle}
      </p>
      <p>
        {strings.route}: {tripData.route}
      </p>
      <p>
        {strings.tripStart}:{" "}
        {datetimeAsDateAndTimeString(tripData.start_datetime, "DD.MM.YYYY", "HH:mm")}
      </p>
      <p>{tripData.start_address}</p>
      <p>
        {strings.kilometerageAtStart}: {tripData.start_km} km
      </p>
      <p>
        {strings.tripEnd}:{" "}
        {datetimeAsDateAndTimeString(tripData.end_datetime, "DD.MM.YYYY", "HH:mm")}
      </p>
      <p>{tripData.end_address}</p>
      <p>
        {strings.kilometerageAtEnd}: {tripData.end_km} km
      </p>
      <p>
        {strings.description}: {tripData.description}
      </p>
      <p>
        {strings.compensation}: {tripData.compensation / 100} €/km
      </p>
      <p>
        {strings.additionalCompensations}: {tripData.additional_compensation / 100} €/km
      </p>
      <p>
        {strings.total}:{" "}
        {calculateDistance(tripData.start_km, tripData.end_km) *
          (tripData.compensation / 100 + tripData.additional_compensation / 100)}{" "}
        €
      </p>
    </Container>
  );
}
