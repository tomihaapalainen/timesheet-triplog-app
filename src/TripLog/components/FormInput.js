import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export default function FormInput({ label, val, valRef }) {
  return (
    <Container className="px-0 mx-0">
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control ref={valRef} type="text" defaultValue={val} />
      </Form.Group>
    </Container>
  );
}
