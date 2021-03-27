import React, { useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import strings from "./strings";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import Loading from "../../shared/Loading";

export default function SignUpForm({ language }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { signup } = useAuth();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  strings.setLanguage(language);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let mounted = true;
    setLoading(true);
    setErrorMessage("");
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;

    signup(username, password)
      .then(async () => {
        try {
          let referrerToken = sessionStorage.getItem("referrer_token");
          await axios.post(`${baseUrl}/users`, {
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
    <Container>
      <Col className="my-3">
        {loading && <Loading />}
        {!loading && (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="my-1"
                type="email"
                placeholder={strings.email + "..."}
                ref={usernameRef}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
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
        )}
      </Col>
      {errorMessage && (
        <Container fluid>
          <p className="text-center text-danger">{errorMessage}</p>
        </Container>
      )}
    </Container>
  );
}
