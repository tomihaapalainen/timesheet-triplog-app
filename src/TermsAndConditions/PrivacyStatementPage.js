import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useGSC } from "../store/GlobalStateProvider";
import FinnishPrivacyStatement from "./components/FinnishPrivacyStatement";
import EnglishPrivacyStatement from "./components/EnglishPrivacyStatement";

const PrivacyStatementPage = () => {
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
      {language === "en" && <EnglishPrivacyStatement />}
      {language === "fi" && <FinnishPrivacyStatement />}
    </Container>
  );
};

export default PrivacyStatementPage;
