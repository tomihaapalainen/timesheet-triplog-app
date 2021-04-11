import React, { useRef, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useGSC } from "../../store/GlobalStateProvider";
import Loading from "../../shared/Loading";
import strings from "./strings";
import { baseUrl } from "../../config";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const { signin, signout } = useAuth();
  const history = useHistory();

  const { language } = useGSC();
  strings.setLanguage(language);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleEmailFocus = () => {
    let element = document.getElementById("focus-target");
    if (window.innerWidth < 500) {
      element.scrollIntoView();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let mounted = true;
    setLoading(true);
    let userCredential;
    try {
      userCredential = await signin(usernameRef.current.value, passwordRef.current.value);
    } catch (error) {
      setShowPasswordReset(true);
      if (mounted) {
        setLoading(false);
      }
      return;
    }

    if (userCredential.user) {
      try {
        let idToken = await userCredential.user.getIdToken(true);
        await axios.get(`${baseUrl}/userdata`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        mounted = false;
        history.push("/app");
      } catch (error) {
        await signout();
        alert(strings.serverNotResponding);
        return;
      }
    } else {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Container id="focus-target" style={{ height: "50px" }} />
      <Row>
        <Col className="mb-3">
          <Form className="center-flex flex-column">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="my-1"
                type="email"
                placeholder={strings.email + "..."}
                ref={usernameRef}
                onFocus={handleEmailFocus}
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
            <Button
              className="text-uppercase"
              type="submit"
              variant="primary"
              onClick={handleSubmit}
            >
              {strings.signIn}
            </Button>
          </Form>
        </Col>
      </Row>
      {showPasswordReset && (
        <Row>
          <Link className="mx-auto my-2 text-primary" to="/reset-password" color="secondary">
            {strings.forgotPassword}
          </Link>
        </Row>
      )}
    </Container>
  );
}
