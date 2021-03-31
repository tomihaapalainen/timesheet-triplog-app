import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useGSC } from "../store/GlobalStateProvider";
import FinnishTerms from "./components/FinnishTerms";
import EnglishTerms from "./components/EnglishTerms";

const TermsPage = () => {
  const { language } = useGSC();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "90%",
        minWidth: "300px",
        maxWidth: "800px",
      }}
    >
      {language === "en" && <EnglishTerms />}
      {language === "fi" && <FinnishTerms />}
    </Container>
  );
};

export default TermsPage;
