import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import InputGroup from "react-bootstrap/InputGroup";
import { useGSC } from "../../store/GlobalStateProvider";
import AccordionToggle from "../../shared/AccordionToggle";
import strings from "./strings";

export default function DailyAllowance({ dailyAllowance, setDailyAllowance }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  const handleDailyAllowanceChanged = (event) => {
    let value = event.target.value;

    if (!isNaN(value)) {
      setDailyAllowance(parseFloat(value));
    }
  };

  return (
    <Container className="px-0 mx-0">
      <Accordion className="mx-auto mw-1024">
        <Card>
          <AccordionToggle title={strings.dailyAllowance} />
          <Accordion.Collapse eventKey="0">
            <Card.Body className="my-1 py-1 mx-auto w-100" style={{ maxWidth: "600px" }}>
              <FormLabel>{strings.dailyAllowance}</FormLabel>
              <InputGroup>
                <FormControl
                  type="number"
                  value={dailyAllowance}
                  onChange={handleDailyAllowanceChanged}
                  onFocus={(event) => event.target.select()}
                />
                <InputGroup.Append>
                  <InputGroup.Text>EUR</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}
