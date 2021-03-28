import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useGSC } from "../store/GlobalStateProvider";
import strings from "./strings";

const TermsAndConditionsPage = () => {
  const { language } = useGSC();
  strings.setLanguage(language);

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "90%",
        minWidth: "300px",
        maxWidth: "800px",
      }}
    >
      <Container>
        <h5 className="lead my-3">{strings.termsAndConditions}</h5>
      </Container>
      <Container className="my-3">
        <p className="info-p">
          <strong>1. {strings.agreement}</strong>
          <br />
          {strings.agreementInfo}
        </p>
      </Container>
      <Container className="my-3">
        <p className="info-p">
          <strong>2. {strings.alterations}</strong>
        </p>
        <p className="info-p">{strings.alterationsInfo}</p>
      </Container>
      <Container className="my-3">
        <p className="info-p">
          <strong>3. {strings.registration}</strong>
          <br />
          {strings.registrationInfo}
        </p>
      </Container>
      <Container className="my-3">
        <p className="info-p">
          <strong>4. {strings.applicationUsage}</strong>
          <br />
          {strings.applicationUsageInfo}
        </p>
      </Container>
      <Container className="my-3">
        <p className="info-p">
          <strong>5. {strings.ordering}</strong>
          <br />
          {strings.orderingInfo}
        </p>
      </Container>
      <Container className="my-3">
        <p className="info-p">
          <strong>6. {strings.payments}</strong>
          <br />
        </p>
        <p>{strings.paymentsInfo} </p>
        <a className="text-primary" href="https://stripe.com" target="_blank" rel="noreferrer">
          https://stripe.com
        </a>
      </Container>
      <Container className="my-4 w-75" style={{ border: "1px solid black" }} />
      <Container className="my-3">
        <h5 className="lead">{strings.privacyStatement} 28.3.2021</h5>
      </Container>
      <Container className="my-3">
        <p>
          <strong>{strings.registrar}</strong>
        </p>
        <p className="info-p">
          Code Fuzz ({strings.businessId} 2935633-4)
          <br />
          Kuninkaistentie 24
          <br />
          02610 Espoo
          <br />
          asiakaspalvelu@pulikka.fi
        </p>
      </Container>
      <Container className="my-3">
        <p className="info-p">
          <strong>{strings.registerNameInfo}</strong>
        </p>
      </Container>
      <Container className="my-3">
        <p className="info-p">{strings.purposeOfTheRegister}</p>
      </Container>
      <Container className="my-3">
        <p className="info-p">{strings.sourcesOfInformationInfo}</p>
      </Container>
      <Container className="my-3">
        <p className="info-p">
          {strings.dataTransferInfo}{" "}
          <a
            className="text-primary"
            href="https://firebase.google.com/terms/data-processing-terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Data Processing Terms
          </a>
        </p>
      </Container>
      <Container className="my-3">
        <p className="info-p">{strings.securityInfo}</p>
      </Container>
      <Container className="my-3">
        <p className="info-p">{strings.inspectionAndRectificationInfo}</p>
      </Container>
    </Container>
  );
};

export default TermsAndConditionsPage;
