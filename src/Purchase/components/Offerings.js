import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { baseUrl } from "../../config";
import { useAuth } from "../../contexts/AuthContext";
import Offering from "./Offering";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";
import "./styles.css";

export default function Offerings({ setSelectedOffering }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();

  const { language } = useGSC();
  strings.setLanguage(language);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let idToken = await currentUser.getIdToken(true);
        let response = await axios.get(`${baseUrl}/purchases/offerings`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });

        if (response.status === 200) {
          setOfferings(response.data);
          sessionStorage.setItem("offerings-cache", JSON.stringify(response.data));
        }
      } catch (error) {
        setErrorMessage(strings.errorLoadingOfferings);
      } finally {
        setLoading(false);
      }
    };

    let data = sessionStorage.getItem("offerings-cache");
    if (data !== null) {
      setOfferings(JSON.parse(data));
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  if (errorMessage) {
    return (
      <Container className="my-5" style={{ maxWidth: "400px" }}>
        <p className="mx-auto">{errorMessage}</p>
      </Container>
    );
  }

  return (
    <Container className="mb-5 mx-auto mw-1024">
      <p className="my-3 lead">{strings.pickOrderDurationAndProceedToCheckout}</p>
      {loading && (
        <Container fluid className="center-flex">
          <Spinner variant="primary" animation="border" role="status" />
        </Container>
      )}
      <Row>
        {offerings.map((o) => (
          <Col key={o.price} className="mx-auto" xs={12} sm={12} md={6} lg={6} xl={6}>
            <Offering setSelectedOffering={setSelectedOffering} offering={o} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Link className="text-primary" to="/terms">
            {strings.terms}
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link className="text-primary" to="/privacy-statement">
            {strings.privacyStatement}
          </Link>
        </Col>
      </Row>
      <p className="purchases-info-p">{strings.pricesIncludeVAT}</p>
      <p className="purchases-info-p">
        {strings.paymentInfo} <strong>{strings.customerServiceEmail}</strong>
      </p>
      <p className="purchases-info-p">{strings.noRefunds}</p>
    </Container>
  );
}
