import React from "react";
import Container from "react-bootstrap/Container";
import "./styles.css";

export default function EnglishTerms() {
  return (
    <Container>
      <h2 className="page-title">Terms and conditions</h2>
      <p lead className="title">
        1. General terms
      </p>
      <p className="paragraph">
        By using Pulikka-application, you accept these terms and agree to abide by them. Code Fuzz,
        business ID 2935633-4, is not responsible for the validity of the information reported by
        the application. The user must always check the validity of the information reported by the
        application before using them.
      </p>
      <p className="paragraph">
        Code Fuzz reserved the right to alter these terms by publishing up to date terms on this
        site. Read up to date terms from this site before making a purchase. By continuing to use
        the application, you accept these terms.
      </p>
      <p lead className="title">
        2. Registration
      </p>
      <p className="paragraph">
        Registering to the application is free. Registering requires a valid e-mail address. By
        registering, the customer receives a free 30 day trial period. Registering does not bind to
        anything.
      </p>
      <p lead className="title">
        3. Application usage
      </p>
      <p className="paragraph">Using the application requires an internet connection.</p>
      <p lead className="title">
        4. Ordering
      </p>
      <p className="paragraph">
        The application is ordered for a fixed term of 3 or 12 months. After the period the customer
        must purchase again in order to continue using the application. Ordering is available only
        for registered users.
      </p>
      <p lead className="title">
        5. Payments
      </p>
      <p className="paragraph">
        Payments are done by card. The payment intermediary is Stripe. Read more here:
      </p>
      <a href="https://www.stripe.com" target="_blank" rel="noreferrer" className="text-primary">
        https://www.stripe.com
      </a>
      <p lead className="title">
        6. Returns
      </p>
      <p className="paragraph">
        Service products and digital content do not have the right of cancellation under the
        consumer protection act if the service has been completed in full, or the delivery of
        digital content has begun electronically after you have given your consent to start delivery
        and if the absence of right of cancellation has been announced in advance.
      </p>
    </Container>
  );
}
