import React from "react";
import Container from "react-bootstrap/Container";
import { useGSC } from "../../store/GlobalStateProvider";
import Footer from "../../components/nav/Footer";
import SignUpForm from "../../components/auth/SignUpForm";
import TryForFreeSignUp from "../../components/jumbotrons/TryForFreeSignUp";
import strings from "./strings";

export default function SignInPage() {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <Container fluid className="p-0 m-0">
      <TryForFreeSignUp language={language} />
      <SignUpForm language={language} />
      <Footer />
    </Container>
  );
}
