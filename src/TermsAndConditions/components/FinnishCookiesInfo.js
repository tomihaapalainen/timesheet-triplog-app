import React from "react";
import Container from "react-bootstrap/Container";
import "./styles.css";

export default function FinnishPrivacyStatement() {
  return (
    <Container>
      <h2 className="page-title">Tietoa evästeistä</h2>
      <p lead className="title">
        Tietoa Pulikka-sivuston käyttämistä evästeistä
      </p>
      <p className="paragraph">
        Eväste on pieni tekstitiedosto, joka tallennetaan käyttäjän tietokoneelle, kun hän vierailee
        sivustossa. Evästeet eivät sisällä henkilötietoja eikä niiden avulla voida suorittaa
        ohjelmia tai tallentaa viruksia käyttäjän tietokoneelle.
      </p>
      <p lead className="title">
        Evästeet tällä sivustolla
      </p>
      <p className="paragraph">
        Käytämme evästeitä tällä sivustolla moniin tarkoituksiin, jotka liittyvät sivuston
        toiminnallisuuteen. Sivusto sisältää maksupalveluvälittäjän (Stripe) evästeitä. Voit lukea
        evästeistä lisää täällä:
      </p>
      <a
        className="text-dark"
        href="https://stripe.com/en-fi/cookie-settings"
        rel="noreferrer"
        target="_blank"
      >
        Stripe evästeet
      </a>
      <p className="title">Evästeiden käytön estäminen</p>
      <p className="paragraph">
        Voit estää evästeiden käytön selaimesi evästeasetuksista. Mikäli estät evästeiden käytön,
        emme voi taata verkkosivuston toiminnallisuutta.
      </p>
    </Container>
  );
}
