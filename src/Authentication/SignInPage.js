import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import SignInForm from "./components/SignInForm";
import Helmet from "react-helmet";

export default function SignInPage() {
  useEffect(() => {
    if (/\/[a-z0-9]+/.test(window.location.pathname)) {
      let referrerToken = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      if (referrerToken.length === 32) {
        sessionStorage.setItem("referrer_token", referrerToken);
      }
    }
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Pulikka.fi - Helppokäyttöinen ja halpa työajanseuranta ja ajopäiväkirja</title>
        <meta
          name="description"
          content="Pulikka.fi on helppokäyttöinen ja halpa työajanseuranta ja ajopäiväkirja yhdessä paikassa. Tutustu 30 päivää ilmaiseksi."
        />
      </Helmet>
      <SignInForm />
    </Container>
  );
}
