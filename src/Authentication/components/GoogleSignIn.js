import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../contexts/AuthContext";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";
import "./styles.css";

export default function GoogleSignIn() {
  const { language } = useGSC();
  strings.setLanguage(language);

  const { signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <Container className="my-4 sign-in-container">
      <Card className="google-sign-in-card" onClick={handleSignIn}>
        <Container fluid>
          <Row className="mx-0 px-0">
            <Col xs={2} className="mx-0 px-0 d-flex justify-content-center align-items-center">
              <FcGoogle size={30} />
            </Col>
            <Col xs={10} className="mx-0 px-0 d-flex justify-content-center align-items-center">
              <p>{strings.signInWithGoogle}</p>
            </Col>
          </Row>
        </Container>
      </Card>
    </Container>
  );
}
