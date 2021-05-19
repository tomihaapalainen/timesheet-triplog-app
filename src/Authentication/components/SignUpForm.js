import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import strings from "./strings";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import Loading from "../../shared/Loading";
import { Card } from "react-bootstrap";

export default function SignUpForm({ language }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signup } = useAuth();
  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  strings.setLanguage(language);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let mounted = true;
    setLoading(true);
    setErrorMessage("");
    let name = nameRef.current.value;
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;

    signup(username, password)
      .then(async () => {
        try {
          let referrerToken = sessionStorage.getItem("referrer_token");
          await axios.post(`${baseUrl}/users`, {
            name: name,
            email: username,
            referrer_token: referrerToken || "",
          });
        } finally {
          if (mounted) {
            setLoading(false);
          }
          mounted = false;
          history.push("/");
        }
      })
      .catch((error) => {
        if (mounted) {
          setLoading(false);
        }
        if (error.code) {
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage(strings.emailAlreadyInUse);
              break;
            case "auth/invalid-email":
              setErrorMessage(strings.invalidEmail);
              break;
            case "auth/weak-password":
              setErrorMessage(strings.passwordTooWeak);
              break;
            case "auth/operation-not-allowed":
              setErrorMessage(strings.emailPasswordAccountsAreNotEnabled);
              break;
            default:
              setErrorMessage(strings.accountCreationFailed);
              break;
          }
        }
      });
  };

  return (
    <Container className="center-flex mx-1 px-1 pt-5">
      <Card className="sign-up-card bg-light">
        <Card.Body className="bg-light center-flex flex-column">
          {loading && <Loading />}
          {!loading && (
            <>
              <Container fluid className="center-flex mb-3 mx-0 px-0">
                <p>{strings.register}</p>
              </Container>
              <Form className="center-flex flex-column">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    size="lg"
                    className="my-1"
                    type="text"
                    placeholder={strings.name + "..."}
                    ref={nameRef}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    size="lg"
                    className="my-1"
                    type="email"
                    placeholder={strings.email + "..."}
                    ref={usernameRef}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    size="lg"
                    className="my-1"
                    type="password"
                    placeholder={strings.password + "..."}
                    ref={passwordRef}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                  {strings.signUp}
                </Button>
              </Form>
            </>
          )}
          <Container fluid className="py-5 mx-0 px-0 center-flex">
            <Link to="/signin">{strings.alreadyRegistered}</Link>
          </Container>
          {errorMessage && (
            <Container fluid>
              <p className="text-center text-danger">{errorMessage}</p>
            </Container>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
