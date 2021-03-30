import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import strings from "../strings";

const paragraphStyle = {
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: 11,
};

export default function TermsLink() {
  return (
    <Nav.Link
      eventKey="5"
      as={Link}
      to={"/terms"}
      className="mx-1 my-1 px-2 bg-primary text-white border-success d-flex flex-row align-items-center"
    >
      <p style={{ ...paragraphStyle }} className="m-1 p-0 text-secondary">
        {strings.terms1}
        <br />
        {strings.terms2}
      </p>
    </Nav.Link>
  );
}
