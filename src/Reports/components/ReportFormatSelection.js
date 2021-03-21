import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import excelLogo from "../../static/excel-logo.png";
import csvLogo from "../../static/csv-logo.png";

export default function ReportFormatSelection({ selectedFormat, setSelectedFormat }) {
  return (
    <Container style={{ height: "80px" }}>
      <Row>
        <Col
          className="d-flex flex-column justify-content-center align-items-end"
          style={{
            height: "100px",
          }}
        >
          <Button
            onClick={() => setSelectedFormat("xlsx")}
            className="bg-light"
            style={{ borderWidth: selectedFormat === "xlsx" ? "4px" : "1px", width: "125px" }}
          >
            <p className="my-0 py-0 text-dark">Excel</p>
            <Image src={excelLogo} alt="excel" roundedCircle />
          </Button>
        </Col>
        <Col
          className="d-flex flex-column justify-content-center align-items-start"
          style={{
            height: "100px",
          }}
        >
          <Button
            onClick={() => setSelectedFormat("csv")}
            className="bg-light"
            style={{ borderWidth: selectedFormat === "csv" ? "4px" : "1px", width: "125px" }}
          >
            <p className="my-0 py-0 text-dark">CSV</p>
            <Image src={csvLogo} alt="csv" roundedCircle />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
