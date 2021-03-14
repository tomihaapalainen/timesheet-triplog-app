import React from "react";
import Container from "react-bootstrap/Container";
import { useGSC } from "../store/GlobalStateProvider";
import Footer from "../Navigation/Footer";
import SignUpForm from "./components/SignUpForm";
import TryForFreeSignUp from "./components/TryForFreeSignUp";
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
