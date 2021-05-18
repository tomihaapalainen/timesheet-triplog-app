import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import FinnishCookiesInfo from "./components/FinnishCookiesInfo";

export default function CookiesPage() {
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, []);

  return (
    <Container
      className="center-flex flex-column"
      style={{
        width: "90%",
        minWidth: "300px",
        maxWidth: "800px",
      }}
    >
      <FinnishCookiesInfo />
    </Container>
  );
}
