import React from "react";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";

const paragraphStyle = {
  fontSize: 16,
};

export default function NavigationLink({ eventKey, title, to }) {
  const history = useHistory();

  const handleClick = (target) => {
    if (target.split("").includes("#")) {
      let [path, elementId] = target.split("#");
      if (window.location.pathname !== path) {
        history.push(path);
      }
      setTimeout(
        () => document.getElementById(elementId).scrollIntoView(),
        window.location.pathname !== target ? 500 : 0
      );
    } else {
      history.push(target);
    }
  };

  return (
    <Nav.Link className="nav-link center-flex" eventKey={eventKey} onClick={() => handleClick(to)}>
      <div className="mx-1 my-1 px-2 text-white">
        <p style={paragraphStyle} className="m-1 p-0">
          {title}
        </p>
      </div>
    </Nav.Link>
  );
}
