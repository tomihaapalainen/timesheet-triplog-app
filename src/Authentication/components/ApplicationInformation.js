import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { useGSC } from "../../store/GlobalStateProvider";
import strings from "./strings";
import enAppImage1 from "../../static/appimages/app-1-en.png";
import fiAppImage1 from "../../static/appimages/app-1-fi.png";
import enAppImage2 from "../../static/appimages/app-2-en.png";
import fiAppImage2 from "../../static/appimages/app-2-fi.png";
import enAppImage3 from "../../static/appimages/app-3-en.png";
import fiAppImage3 from "../../static/appimages/app-3-fi.png";
import "./styles.css";

export default function ApplicationInformation() {
  const { language } = useGSC();
  strings.setLanguage(language);

  const timesheetInfos = [
    strings.timesheetInfo1,
    strings.timesheetInfo2,
    strings.timesheetInfo3,
    strings.timesheetInfo4,
  ];

  const tripLogInfos = [strings.triplogInfo1, strings.tripLogInfo2, strings.tripLogInfo3];

  const reportsInfos = [strings.reportInfo1, strings.reportInfo2];

  return (
    <Container fluid className="mt-5 py-5 app-info-bg">
      <Carousel interval={8000}>
        <Carousel.Item>
          <Container className="w-75">
            <Row>
              <Col md={6} className="d-flex flex-column justify-content-center">
                <p className="text-white mb-3" style={{ fontSize: 18 }}>
                  {strings.timesheets}
                </p>
                {timesheetInfos.map((timesheetInfo, index) => (
                  <p key={index} className="text-white pb-4">
                    {timesheetInfo}
                  </p>
                ))}
              </Col>
              <Col
                md={6}
                className="d-flex flex-column justify-content-center align-items-center my-3"
              >
                <Image
                  className="carousel-image"
                  src={language === "en" ? enAppImage1 : fiAppImage1}
                  alt="app-image-1"
                />
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container className="w-75">
            <Row>
              <Col md={6} className="d-flex flex-column justify-content-center">
                <p className="text-white mb-3" style={{ fontSize: 18 }}>
                  {strings.triplogs}
                </p>
                {tripLogInfos.map((tripLogInfo, index) => (
                  <p key={index} className="text-white pb-4">
                    {tripLogInfo}
                  </p>
                ))}
              </Col>
              <Col
                md={6}
                className="d-flex flex-column justify-content-center align-items-center my-3"
              >
                <Image
                  className="carousel-image"
                  src={language === "en" ? enAppImage2 : fiAppImage2}
                  alt="app-image-2"
                />
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container className="w-75">
            <Row>
              <Col md={6} className="d-flex flex-column justify-content-center">
                <p className="text-white mb-3" style={{ fontSize: 18 }}>
                  {strings.reports}
                </p>
                {reportsInfos.map((reportsInfo, index) => (
                  <p key={index} className="text-white pb-4">
                    {reportsInfo}
                  </p>
                ))}
              </Col>
              <Col
                md={6}
                className="d-flex flex-column justify-content-center align-items-center my-3"
              >
                <Image
                  className="carousel-image"
                  src={language === "en" ? enAppImage3 : fiAppImage3}
                  alt="app-image-3"
                />
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
