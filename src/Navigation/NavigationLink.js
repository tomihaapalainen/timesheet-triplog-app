import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const paragraphStyle = {
  fontSize: 16,
};

export default function NavigationLink({ eventKey, title, to }) {
  return (
    <Nav.Link
      eventKey={eventKey}
      as={Link}
      to={to}
      className="mx-1 my-1 px-2 text-white border-success d-flex flex-row align-items-center"
    >
      <p style={paragraphStyle} className="m-1 p-0">
        {title}
      </p>
    </Nav.Link>
  );
}
