import React from "react";
import Container from "react-bootstrap/Container";
import "./styles.css";

export default function FinnishTerms() {
  return (
    <Container>
      <h2 className="page-title">Privacy statement</h2>
      <p className="mb-3">
        This is a EU General Data Protection Regulation compliant privacy statement of Code Fuzz.
        Drafted on 29.03.2021. Last changed on 29.03.2021.
      </p>
      <p lead className="title">
        1. Registrar
      </p>
      <p>Code Fuzz</p>
      <p>Kuninkaistentie 24</p>
      <p>02610 Espoo</p>
      <p lead className="title">
        2. Register contact person
      </p>
      <p>
        Tomi Haapalainen
        <br />
        tomi.haapalainen@pulikka.fi
      </p>
      <p lead className="title">
        3. Register name
      </p>
      <p className="paragraph">Pulikka.fi customer register</p>
      <p lead className="title">
        4. Legal basis and purpose of the processing of personal data
      </p>
      <p className="paragraph">
        The legal basis for the processing of personal data under the EU General Data Protection
        Regulation is the consent of the person.
      </p>
      <p className="paragraph">
        The purpose of the processing of personal data is to communication with customers and
        maintaining customer relationship.
      </p>
      <p className="paragraph">Data is not used for automatic decision-making or profiling.</p>
      <p lead className="title">
        5. Information content of the register
      </p>
      <p className="paragraph">
        Information to be stored in the register are the person's name, contact details (e-mail
        address), information about ordered services and billing information.
      </p>
      <p className="paragraph">
        IP addresses of website visitors and cookies necessary for the operation of the service are
        processed on the basis of legitimate interest, e.g. to ensure data security and for the
        collection of statistics on visitors to the site and cases where they may be considered as
        personal data. Consent for third pary cookies is requested separately.
      </p>
      <p lead className="title">
        6. Regular sources of information
      </p>
      <p className="paragraph">
        Information stored in the register is obtained from the customer including web forms,
        e-mails, telephone, social media services, contracts, customer meetings and other situations
        in which the customer discloses their information.
      </p>
      <p className="paragraph">
        Contact information for companies and other organizations can also be collected from public
        sources such as websites, directory services and other businesses.
      </p>
      <p lead className="title">
        7. Regular transfers of data and transfers of data outside the EU or the EEA
      </p>
      <p className="paragraph">
        Information is not regularly disclosed to other parties. Information may be published in
        that regard as agreed with the customer.
      </p>
      <p className="paragraph">
        Data may also be transferred by the controller outside the EU or the EEA.
      </p>
      <p lead className="title">
        8. Registry security principles
      </p>
      <p className="paragraph">
        The register is handled with care and data processed by information systems is adequately
        protected. When registry information is stored on Internet servers, the physical and digital
        security of their hardware is adequately addressed. The controller shall ensure that stored
        data, as well as server access rights and other information critical to security of personal
        data are treated confidentially and only by the employees whote job description it includes.
      </p>
      <p lead className="title">
        9. Right of inspection and right to request correction of information
      </p>
      <p className="paragraph">
        Every person in the register has the right to check their information from register and
        require the correction of any incorrect or incomplete information in the register. If a
        person wants to check or request their information, the person must send a written request
        from the e-mail connected to the customer's account. The registrar may, if necessary,
        request the person to prove their identity. The registrar will respond to the customer
        within the time limit set by the Data Protection Regulation (generally within one month).
      </p>
      <p lead className="title">
        10. Other rights related to the processing of personal data
      </p>
      <p className="paragraph">
        A person in the register has the right to request removal of their data from the register
        ("right to be forgotten"). Likewise, registered persons have other rights under the EU's
        General Data Protection Regulation, such as restricting data processing in certain
        situations. Requests must be sent in writing to the registrar. If necessary, the registrar
        may ask the person to prove their identity. The registrar will respond to the customer
        within the time limit set by the Data Protection Regulation (generally within one month).
      </p>
    </Container>
  );
}
