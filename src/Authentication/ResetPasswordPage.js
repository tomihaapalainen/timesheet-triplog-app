import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../shared/Loading";
import strings from "./strings";
import { useGSC } from "../store/GlobalStateProvider";

export default function ResetPasswordPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [show, setShow] = useState(false);
  const emailRef = useRef();

  const history = useHistory();
  const { resetPassword } = useAuth();

  const { language } = useGSC();
  strings.setLanguage(language);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value, `${window.location.origin}`);
      setShow(true);
    } catch (error) {
      if (error.code) {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage(strings.invalidEmail);
            break;
          case "auth/user-not-found":
            setErrorMessage(strings.userNotFound);
            break;
          default:
            setErrorMessage(strings.errorSendingPasswordResetEmail);
            break;
        }
      } else {
        setErrorMessage(strings.errorSendingPasswordResetEmail);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    history.push("/");
  };

  return (
    <Container className="mt-5 w-50" style={{ minWidth: "300px" }}>
      <Alert show={show} variant="success" style={{ position: "absolute", top: "20px" }}>
        <p>{strings.linkSentToEmail}</p>
        <hr />
        <Container className="d-flex justify-content-end">
          <Button onClick={handleClose} variant="outline-success">
            OK
          </Button>
        </Container>
      </Alert>
      {!loading && (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Form.Label className="my-3">{strings.requestPasswordResetEmail}</Form.Label>
            <Form.Control ref={emailRef} placeholder={strings.email + "..."} />
            <Container className="center-flex mt-2">
              <Button type="submit">{strings.send}</Button>
            </Container>
          </FormGroup>
        </Form>
      )}
      {loading && <Loading />}
      <Container>
        {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
      </Container>
    </Container>
  );
}
