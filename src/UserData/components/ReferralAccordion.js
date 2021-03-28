import React, { useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Toast from "react-bootstrap/Toast";
import { useGSC } from "../../store/GlobalStateProvider";
import AccordionToggle from "../../shared/AccordionToggle";
import { FaCopy } from "react-icons/fa";
import strings from "./strings";

export default function ReferralAccordion() {
  const [showToast, setShowToast] = useState(false);
  const { invitationToken, language } = useGSC();
  const referralLinkRef = useRef();

  strings.setLanguage(language);

  const formatInvitationLink = (token) => {
    return `https://${window.location.host}/${token}`;
  };

  const copyLinkToClipboard = (event) => {
    referralLinkRef.current.select();
    event.target.focus();
    document.execCommand("copy");
    setShowToast(true);
  };

  return (
    <Accordion className="mw-1024 mx-auto">
      <Card>
        <AccordionToggle title={strings.inviteUsers} />
        <Accordion.Collapse eventKey="0">
          <Card.Body className="mx-auto">
            <p className="mb-3">{strings.inviteInfo}</p>
            <p className="mb-3" style={{ fontSize: 14 }}>
              {strings.annualPriceInfo}
            </p>

            <InputGroup>
              <Toast
                style={{ position: "absolute", top: -50, right: 0, height: 45 }}
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={2000}
                autohide
              >
                <Toast.Body>
                  <p>{strings.linkCopied}</p>
                </Toast.Body>
              </Toast>
              <FormControl
                className="border-primary"
                value={formatInvitationLink(invitationToken)}
                style={{ height: "50px" }}
                ref={referralLinkRef}
                onChange={() => {}}
                disabled
              />
              <InputGroup.Append>
                <Button className="bg-primary border-primary" onClick={copyLinkToClipboard}>
                  <FaCopy size={30} color="white" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
