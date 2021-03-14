import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import TryForFree from "../../components/jumbotrons/TryForFree";
import GoogleSignIn from "../../components/auth/GoogleSignIn";
import SignInForm from "../../components/auth/SignInForm";
import ApplicationInformation from "../../components/info/ApplicationInformation";
import PricingInformation from "../../components/info/PricingInformation";
import Footer from "../../components/nav/Footer";

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
      <TryForFree />
      <SignInForm />
      <GoogleSignIn />
      <ApplicationInformation />
      <PricingInformation />
      <Footer />
    </Container>
  );
}
