import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { useGSC } from "../../store/GlobalStateProvider";
import strings from "./strings";

export default function DailyAllowance({ dailyAllowance, setDailyAllowance }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const handleDailyAllowanceChanged = (event) => {
    let value = event.target.value;

    if (!isNaN(value)) {
      setDailyAllowance(parseInt(value));
    }
  };

  return (
    <Container fluid className="mx-0 px-0 py-0 my-0">
      <Card className="py-0">
        <Card.Body className="py-3">
          <InputGroup>
            <FormControl
              type="number"
              placeholder={strings.dailyAllowance}
              value={dailyAllowance}
              onChange={handleDailyAllowanceChanged}
              onFocus={(event) => event.target.select()}
            />
            <InputGroup.Append>
              <InputGroup.Text>€</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}
