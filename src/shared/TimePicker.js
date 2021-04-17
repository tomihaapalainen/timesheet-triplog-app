import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import "./styles.css";

export default function TimePicker({ label, minsId, hours, minutes, setHours, setMinutes }) {
  const [fromHoursInput, setFromHourInput] = useState(false);

  useEffect(() => {
    if (hours.length === 2 && fromHoursInput) {
      setFromHourInput(false);
      focusAndSelectMinutes();
    }
  }, [hours]);

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleHoursBlur = (e) => {
    setHours(hours.padStart(2, "0"));
  };

  const handleMinutesBlur = (e) => {
    let newMinutes = minutes.padStart(2, "0");
    setMinutes(newMinutes);
  };

  const handleHoursKeyUp = (event) => {
    if (event.key === "Enter") {
      focusAndSelectMinutes();
    }
  };

  const handleMinutesKeyUp = (event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  };

  const focusAndSelectMinutes = () => {
    let elem = document.getElementById(minsId);
    elem.focus();
    elem.select();
  };

  const onHoursChanged = (event) => {
    let newHours = event.target.value;
    if (newHours.length > 2 || !/^$|\d+/.test(newHours)) {
      return;
    }
    if (parseInt(newHours) > 2) {
      newHours = newHours.padStart(2, "0");
      setFromHourInput(true);
    }
    setHours(newHours);
  };

  const onMinutesChanged = (event) => {
    if (event.target.value.length > 2 || !/^$|\d+/.test(event.target.value)) {
      return;
    }
    setMinutes(event.target.value);
  };

  return (
    <Container fluid>
      <Row className="my-0 py-0 center-flex">
        <p className="my-0 py-0">{label}</p>
      </Row>
      <Row className="center-flex">
        <FormControl
          className="time-input bg-primary text-white"
          value={hours}
          onChange={(e) => onHoursChanged(e)}
          type="number"
          onFocus={handleFocus}
          onBlur={handleHoursBlur}
          onKeyUp={handleHoursKeyUp}
          min={0}
          max={23}
          maxLength={2}
        />
        <p className="text-primary pb-1" style={{ fontSize: "28px" }}>
          :
        </p>
        <FormControl
          className="time-input bg-primary text-white"
          id={minsId}
          value={minutes}
          onChange={(e) => onMinutesChanged(e)}
          type="number"
          onFocus={handleFocus}
          onBlur={handleMinutesBlur}
          onKeyUp={handleMinutesKeyUp}
          maxLength={2}
          min={0}
          max={59}
        />
      </Row>
    </Container>
  );
}
