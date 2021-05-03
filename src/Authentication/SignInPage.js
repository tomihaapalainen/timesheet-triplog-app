import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import TryForFree from "./components/TryForFree";
import SignInForm from "./components/SignInForm";
import ApplicationInformation from "./components/ApplicationInformation";
import PricingInformation from "./components/PricingInformation";
import Footer from "../Navigation/Footer";
import CookieNote from "./components/CookieNote";
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
    <Container fluid className="p-0 m-0">
      <Helmet>
        <title>Pulikka.fi - Helppokäyttöinen ja halpa työajanseuranta ja ajopäiväkirja</title>
        <meta
          name="description"
          content="Pulikka.fi on helppokäyttöinen ja halpa työajanseuranta ja ajopäiväkirja yhdessä paikassa. Tutustu 30 päivää ilmaiseksi."
        />
      </Helmet>
      <TryForFree />
      <SignInForm />
      <ApplicationInformation />
      <PricingInformation />
      <CookieNote />
      <Footer />
    </Container>
  );
}
