import React, { useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { useGSC } from "../../store/GlobalStateProvider";
import { FaCopy, FaAngleDown, FaAngleUp } from "react-icons/fa";
import strings from "./strings";

export default function ReferralAccordion() {
  const [showToast, setShowToast] = useState(false);
  const [open, setOpen] = useState(true);
  const { invitationToken, language } = useGSC();
  const referralLinkRef = useRef();

  strings.setLanguage(language);

  const formatInvitationLink = (token) => {
    return `https://${window.location.host}/${token}`;
  };

  const copyLinkToClipboard = (event) => {
    let linkTextarea = document.getElementById("referral-link-textarea");
    linkTextarea.focus();
    linkTextarea.select();
    document.execCommand("copy");
    linkTextarea.blur();
    setShowToast(true);
  };

  return (
    <Accordion className="mw-1024 mx-auto" defaultActiveKey="0">
      <Card className="invitation-border">
        <Accordion.Toggle
          as={Card.Header}
          onClick={() => setOpen(!open)}
          eventKey="0"
          className="bg-primary text-light pointer"
        >
          <Container className="mx-0 px-0">
            <Row className="justify-content-space-between">
              <Col xs={10}>
                <p className="m-0 p-0 font-weight-bold">{strings.inviteUsers}</p>
              </Col>
              <Col className="d-flex justify-content-end" xs={2}>
                {open ? (
                  <FaAngleUp color="#fff" size={20} />
                ) : (
                  <FaAngleDown color="#fff" size={20} />
                )}
              </Col>
            </Row>
          </Container>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="mx-auto">
            <p className="mb-3">{strings.inviteInfo}</p>
            <p className="mb-3" style={{ fontSize: 14 }}>
              {strings.annualPriceInfo}
            </p>

            <InputGroup>
              <Toast
                className="bg-success text-white"
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
                id="referral-link-textarea"
                className="border-primary"
                value={formatInvitationLink(invitationToken)}
                style={{ height: "50px" }}
                ref={referralLinkRef}
                onChange={() => {}}
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
