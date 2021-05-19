import React, { useRef, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useGSC } from "../../store/GlobalStateProvider";
import strings from "./strings";
import { baseUrl } from "../../config";
import "./styles.css";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const { signin, signout } = useAuth();
  const history = useHistory();

  const { language } = useGSC();
  strings.setLanguage(language);

  const usernameRef = useRef();
  const passwordRef = useRef();

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

  return (
    <Container className="center-flex mx-1 px-1 pt-5">
      <Card className="sign-up-card bg-light">
        <Card.Body className="bg-light center-flex flex-column">
          {!loading && (
            <>
              <Container fluid className="center-flex mb-3">
                <p>{strings.signInToAccount}</p>
              </Container>
              <Form className="center-flex flex-column">
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
                <Container className="center-flex">
                  {!loading && (
                    <Button type="submit" variant="primary" onClick={handleSubmit}>
                      {strings.signIn}
                    </Button>
                  )}
                  {loading && <Spinner variant="primary" animation="border" />}
                </Container>
              </Form>
            </>
          )}
          <Container fluid className="py-5 mx-0 px-0 center-flex">
            <Link to="/register">{strings.noAccountYet}</Link>
          </Container>
        </Card.Body>
      </Card>
      {showPasswordReset && (
        <Container fluid className="mt-4 center-flex">
          <Link className="mx-auto text-primary" to="/reset-password" color="secondary">
            {strings.forgotPassword}
          </Link>
        </Container>
      )}
    </Container>
  );
}
