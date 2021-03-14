import React from "react";
import Container from "react-bootstrap/Container";
import TwoButtons from "./TwoButtons";
import strings from "./strings";
import { useGSC } from "../../../store/GlobalStateProvider";

export default function TripActions({
  tripStart,
  tripEnd,
  handleStart,
  handleEnd,
  getDisabled,
  getEndDisabled,
  getSaveDisabled,
  setShowCancelStartDialog,
  setShowCancelEndDialog,
  handleSubmit,
}) {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <Container className="px-0 mx-0 mt-4">
      {tripStart === null && (
        <TwoButtons
          leftLabel=""
          leftAction={null}
          rightLabel={strings.start}
          rightAction={handleStart}
          rightDisabled={getDisabled}
        />
      )}
      {tripStart !== null && tripEnd === null && (
        <TwoButtons
          leftLabel={strings.cancel}
          leftAction={() => setShowCancelStartDialog(true)}
          rightLabel={strings.end}
          rightAction={handleEnd}
          rightDisabled={getEndDisabled}
        />
      )}
      {tripStart !== null && tripEnd !== null && (
        <TwoButtons
          leftLabel={strings.cancel}
          leftAction={() => setShowCancelEndDialog(true)}
          rightLabel={strings.save}
          rightAction={handleSubmit}
          rightDisabled={getSaveDisabled}
        />
      )}
    </Container>
  );
}
