import React, { useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import englishFlag from "../static/english-flag-64.png";
import finnishFlag from "../static/finnish-flag-64.png";
import { useGSC } from "../store/GlobalStateProvider";
import { getAndSetIfNotNull } from "../utils/storageutils";

export default function LanguageSelection() {
  const { language, setLanguage } = useGSC();

  useEffect(() => {
    getAndSetIfNotNull("current-language", setLanguage);
  }, []);

  const onSelect = (lang) => {
    localStorage.setItem("current-language", lang);
    setLanguage(lang);
  };

  return (
    <Nav.Item className="my-0 border-primary">
      <Dropdown className="bg-primary">
        <Dropdown.Toggle className="center-flex px-2 ml-2">
          <Image
            src={language === "fi" ? finnishFlag : englishFlag}
            alt="lang"
            roundedCircle
            style={{ width: 30, height: 30 }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="bg-primary">
          <Dropdown.Item className="my-2">
            <Container className="m-0 p-0" onClick={() => onSelect("fi")}>
              <Image src={finnishFlag} alt="fi" roundedCircle style={{ width: 30, height: 30 }} />
              <p style={{ color: "#fff", textTransform: "uppercase" }}>Suomi</p>
            </Container>
          </Dropdown.Item>
          <Dropdown.Item className="my-2">
            <Container className="m-0 p-0" onClick={() => onSelect("en")}>
              <Image src={englishFlag} alt="en" roundedCircle style={{ width: 30, height: 30 }} />
              <p style={{ color: "#fff", textTransform: "uppercase" }}>English</p>
            </Container>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
}
