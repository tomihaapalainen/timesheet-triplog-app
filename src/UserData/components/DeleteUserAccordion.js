import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../contexts/AuthContext";
import { useGSC } from "../../store/GlobalStateProvider";
import AccordionToggle from "../../shared/AccordionToggle";
import Loading from "../../shared/Loading";
import strings from "./strings";
import { baseUrl } from "../../config";
import { getCredential } from "../../firebase";

export default function DeleteUserAccordion() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { language } = useGSC();
  const { currentUser } = useAuth();
  const history = useHistory();

  const passwordRef = useRef();

  strings.setLanguage(language);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    const credential = getCredential(currentUser.email, passwordRef.current.value);
    try {
      await currentUser.reauthenticateWithCredential(credential);
      let idToken = await currentUser.getIdToken(true);
      await axios.delete(`${baseUrl}/users`, { headers: { Authorization: `Bearer ${idToken}` } });
      currentUser.delete();
      alert(strings.accountRemoved);
      history.push("/");
    } catch (error) {
      setErrorMessage(strings.checkPassword);
    } finally {
      setLoading(false);
    }
    return;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Accordion className="mw-1024 mx-auto">
      <Card>
        <AccordionToggle title={strings.deleteMyAccount} />
        <Accordion.Collapse eventKey="0">
          <Card.Body className="d-flex flex-column justify-content-center">
            <p className="mb-3">{strings.deleteNote}</p>
            <Form className="center-flex flex-column">
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  className="my-1"
                  type="password"
                  placeholder={strings.password + "..."}
                  ref={passwordRef}
                />
              </Form.Group>
              <Button
                className="text-white text-uppercase"
                type="submit"
                variant="danger"
                onClick={handleSubmit}
              >
                {strings.deleteMyAccount}
              </Button>
              {errorMessage && <p className="text-warning">{strings.checkPassword}</p>}
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
