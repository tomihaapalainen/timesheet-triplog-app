import React from "react";
import Container from "react-bootstrap/Container";
import { useGSC } from "../store/GlobalStateProvider";
import SignUpForm from "./components/SignUpForm";
import TryForFreeSignUp from "./components/TryForFreeSignUp";
import strings from "./strings";
import Helmet from "react-helmet";

export default function SignInPage() {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <Container fluid className="p-0 m-0">
      <Helmet>
        <title>Pulikka.fi - Helppokäyttöinen ja halpa työajanseuranta ja ajopäiväkirja</title>
        <meta
          name="description"
          content="Pulikka.fi on helppokäyttöinen ja halpa työajanseuranta ja ajopäiväkirja yhdessä paikassa. Tutustu 30 päivää ilmaiseksi."
        />
      </Helmet>
      <TryForFreeSignUp language={language} />
      <SignUpForm language={language} />
    </Container>
  );
}
