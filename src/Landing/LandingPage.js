import React from "react";
import Container from "react-bootstrap/Container";
import Helmet from "react-helmet";
import strings from "./strings";
import "./styles.css";
import { useGSC } from "../store/GlobalStateProvider";

export default function LandingPage() {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <>
      <Helmet>
        <title>Pulikka.fi - Helppokäyttöinen ja halpa työajanseuranta ja ajopäiväkirja</title>
        <meta
          name="description"
          content="Pulikka.fi on helppokäyttöinen ja halpa työajanseuranta ja ajopäiväkirja yhdessä paikassa. Tutustu 30 päivää ilmaiseksi."
        />
      </Helmet>
      <Container className="landing-page">
        <Container>
          <h1 className="app-title-header">{strings.header}</h1>
        </Container>
        <Container>
          <h2 className="second-title">{strings.header2}</h2>
        </Container>
      </Container>
    </>
  );
}
