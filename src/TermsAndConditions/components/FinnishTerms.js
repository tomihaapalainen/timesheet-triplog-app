import React from "react";
import Container from "react-bootstrap/Container";
import "./styles.css";

export default function FinnishTerms() {
  return (
    <Container>
      <h2 className="page-title">Sopimusehdot</h2>
      <p lead className="title">
        1. Sopimus
      </p>
      <p className="paragraph">
        Käyttämällä Pulikka-sovellusta hyväksyt nämä sopimusehdot ja sitoudut noudattamaan niitä.
        Code Fuzz, Y-tunnus 2935633-4, ei ole vastuussa sovelluksen raportoimien arvojen
        oikeellisuudesta. Käyttäjän on aina tarkastettava sovelluksen raportoimat arvot ennen niiden
        käyttämistä.
      </p>
      <p className="paragraph">
        Code Fuzz pidättää oikeuden muuttaa näitä sopimusehtoja julkaisemalla päivitetyt ehdot tällä
        verkkosivustolla. Tutustu voimassa oleviin ehtoihin tällä sivustolla ennen palvelun
        ostamista. Jatkamalla sovelluksen käyttöä hyväksyt nämä sopimusehdot.
      </p>
      <p lead className="title">
        2. Rekisteröityminen
      </p>
      <p className="paragraph">
        Rekisteröityminen sovellukseen on ilmaista. Rekisteröityminen vaatii voimassa olevan
        sähköpostiosoitteen. Rekisteröityessä asiakas saa 30 päivän ilmaisen kokeilujakson.
        Rekisteröityminen ei sido mihinkään.
      </p>
      <p lead className="title">
        3. Sovelluksen käyttäminen
      </p>
      <p className="paragraph">Sovelluksen käyttäminen vaatii internet-yhteyden.</p>
      <p lead className="title">
        4. Tilaaminen
      </p>
      <p className="paragraph">
        Sovelluksen käyttöoikeus on määräaikainen. Käyttöoikeus tilataan 3 tai 12 kuukaudeksi
        kerrallaan. Asiakkaan tulee uusia käyttöoikeus tilausjakson päätyttyä mikäli sovelluksen
        käyttöä halutaan jatkaa. Tilaus onnistuu vain rekisteröityneiltä asiakkailta.
      </p>
      <p lead className="title">
        5. Maksut
      </p>
      <p className="paragraph">
        Maksut suoritetaan kortilla. Maksunvälittäjänä toimii Stripe. Lue lisää täältä:
      </p>
      <a href="https://www.stripe.com" target="_blank" rel="noreferrer" className="text-primary">
        https://www.stripe.com
      </a>
      <p lead className="title">
        6. Palautus
      </p>
      <p className="paragraph">
        Palvelutuotteilla tai digitaalisella sisällöllä ei ole kuluttajansuojalain mukaisesti
        peruutusoikeutta, jos palvelu on kokonaan suoritettu, tai digitaalisen sisällön
        toimittaminen sähköisesti on aloitettu sinun annettua suostumuksesi toimittamisen
        aloittamiseen ja jos peruutusoikeuden puuttumisesta on kerrottu ennakkoon.
      </p>
    </Container>
  );
}
