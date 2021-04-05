import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import strings from "./strings";
import Cookie from "js-cookie";
import "./styles.css";
import { useGSC } from "../../store/GlobalStateProvider";

export default function CookieNote() {
  const { cookiesAccepted, setCookiesAccepted } = useGSC();
  const handleCookiesAccepted = () => {
    setCookiesAccepted(true);
    Cookie.set("cookies-accepted", "cookies-accepted", { expires: 365 });
  };

  useEffect(() => {
    let cookie = Cookie.get("cookies-accepted");
    setCookiesAccepted(Boolean(cookie));
  }, []);

  if (cookiesAccepted) {
    return <div></div>;
  }

  return (
    <Navbar className="cookie-nav bg-primary text-light border-success">
      <Container fluid className="align-items-center">
        <Row className="w-100">
          <Col xs={12} md={10} className="my-4">
            {strings.siteUsesCookies}
            <Link to="/terms" className="text-white" style={{ textDecoration: "underline" }}>
              {strings.here}
            </Link>
          </Col>
          <Col xs={12} md={2} className="justify-content-center align-items-center">
            <Button
              variant="success"
              className="accept-cookies-btn my-4"
              onClick={handleCookiesAccepted}
            >
              {strings.acceptCookies}
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
