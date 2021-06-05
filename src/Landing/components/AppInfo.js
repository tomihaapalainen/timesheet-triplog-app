import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

import strings from "../strings";
import "../styles.css";
import enAppImage1 from "../../static/appimages/app-1-en.png";
import fiAppImage1 from "../../static/appimages/app-1-fi.png";
import enAppImage2 from "../../static/appimages/app-2-en.png";
import fiAppImage2 from "../../static/appimages/app-2-fi.png";
import enAppImage3 from "../../static/appimages/app-3-en.png";
import fiAppImage3 from "../../static/appimages/app-3-fi.png";
import { useGSC } from "../../store/GlobalStateProvider";

export default function AppInfo() {
  const { language } = useGSC();
  strings.setLanguage(language);

  const timesheetInfos = [
    strings.timesheetInfo1,
    strings.timesheetInfo2,
    strings.timesheetInfo3,
    strings.timesheetInfo4,
  ];

  const tripLogInfos = [strings.triplogInfo1, strings.tripLogInfo2, strings.tripLogInfo3];

  const reportsInfos = [strings.reportInfo1, strings.reportInfo2, strings.reportInfo3];

  return (
    <Container fluid className="py-5">
      <Container id="timesheet" className="w-100 center-flex">
        <Row className="w-100">
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h2 className="mb-3 app-info-title text-dark">{strings.timesheets}</h2>
            {timesheetInfos.map((timesheetInfo, index) => (
              <p key={index} className="pb-4 text-dark" style={{ fontSize: 18 }}>
                {timesheetInfo}
              </p>
            ))}
          </Col>
          <Col md={6} className="center-flex flex-column my-3">
            <Image
              className="carousel-image"
              src={language === "en" ? enAppImage1 : fiAppImage1}
              alt="Helppo työajanseuranta"
            />
          </Col>
        </Row>
      </Container>
      <Container id="triplog" className="w-100 center-flex">
        <Row className="w-100">
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h2 className="mb-3 app-info-title text-dark">{strings.triplogs}</h2>
            {tripLogInfos.map((tripLogInfo, index) => (
              <p key={index} className="pb-4 text-dark" style={{ fontSize: 18 }}>
                {tripLogInfo}
              </p>
            ))}
          </Col>
          <Col md={6} className="center-flex flex-column my-3">
            <Image
              className="carousel-image"
              src={language === "en" ? enAppImage2 : fiAppImage2}
              alt="Helppo ajopäiväkirja"
            />
          </Col>
        </Row>
      </Container>
      <Container id="reports" className="w-100 center-flex">
        <Row className="w-100">
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h2 className="mb-3 app-info-title text-dark">{strings.reports}</h2>
            {reportsInfos.map((reportsInfo, index) => (
              <p key={index} className="pb-4 text-dark" style={{ fontSize: 18 }}>
                {reportsInfo}
              </p>
            ))}
          </Col>
          <Col md={6} className="center-flex flex-column my-3">
            <Image
              className="carousel-image"
              src={language === "en" ? enAppImage3 : fiAppImage3}
              alt="Kattavat raportit"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
