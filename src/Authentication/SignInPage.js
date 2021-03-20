import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import TryForFree from "./components/TryForFree";
import GoogleSignIn from "./components/GoogleSignIn";
import SignInForm from "./components/SignInForm";
import ApplicationInformation from "./components/ApplicationInformation";
import PricingInformation from "./components/PricingInformation";
import Footer from "../Navigation/Footer";
import strings from "./components/strings";

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
      <Container>
        <p className="text-warning">{strings.serviceUnavailable}</p>
      </Container>
      <TryForFree />
      <SignInForm />
      <GoogleSignIn />
      <ApplicationInformation />
      <PricingInformation />
      <Footer />
    </Container>
  );
}