import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25px",
      }}
    >
      <Spinner variant="primary" animation="border" />
    </Container>
  );
}
