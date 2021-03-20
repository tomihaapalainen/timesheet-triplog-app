import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    orderFailed: "Checkout failed. Please try again later.",
    backToCheckout: "Back to checkout page",
    privacyStatement: "Privacy statement",
    termsAndConditions: "Terms and conditions",
    agreement: "Agreement",
    agreementInfo:
      "By using Pulikka-application you accepts these terms and conditions and agree to follow them. Code Fuzz, business ID 2935633-4, is not responsible for the validity of the information produced by the application. The user is reponsible for checking the validity of the provided information before using the information for any purpose.",
    alterations: "Alterations",
    alterationsInfo:
      "The provider reserves the right to make changes to these terms and conditions by publishing updated terms and conditions on this website. See the up-to-date terms and conditions on this page before making a purchase. Updates to these terms and conditions will be announced to customers. By continuing to use the application, you accept these terms and conditions.",
    registration: "Registration",
    registrationInfo: "Registering to the application requires a valid email address.",
    applicationUsage: "Application usage",
    applicationUsageInfo:
      "Using the application requires an internet connection, and using the trip log requires access to your device GPS location. GPS-location is used for determining trip starting and ending locations.",
    ordering: "Ordering",
    orderingInfo:
      "Ordering the application is for a fixed term. You may order the application for a fixed term of 3 months or 12 months at a time. The customer must renew the order at the of the term to continue using the application. After the free trial period, the application is usable immediately after a successful checkout.",
    payments: "Payments",
    paymentsInfo:
      "Visma Pay (Paybyway Oy, business-id FI24865594) is the payment facilitator of the online shop. Paybyway Oy is a payment facilitator authorized by the Financial Supervisory Authority of Finland. The payment process is conducted in the online service of Visma Pay. Visma Pay or Paybyway Oy is shown as the receiver of your payment in the bank account listing and in your invoice. Paying with Visma Pay is safe. All information is exchanged through secured connections.The trade happens between the online customer and the online shop. The online shop is responsible for all obligations related to the trade.",
    paymentsInfo2: "Read more about Visma Pay ",
    paymentsInfoHere: "here",
    paymentsInfo3:
      "With Visma Pay you can pay your order by an internet banking account, a wallet, a payment card (credit/debit), an invoice or a partial payment. The following methods of payment are supported: Osuuspankki, Nordea, Danske Bank, Oma Säästöpankki, Säästöpankki, Aktia, Paikallisosuuspankit, S-Pankki, Handelsbanken, Ålandsbanken, Jousto, Enterpay Company Invoice, MobilePay, Masterpass, Pivo, Visa-, Visa Debit-, Visa Electron-, MasterCard- and Debit MasterCard payment cards.",
    registrar: "Registrar",
    registerName: "Register name",
    registerNameInfo: "Pulikka.fi customer register",
    purposeOfTheRegister:
      "The information in the register is used for processing customer orders and managing customer relationship.",
    sourcesOfInformationInfo:
      "Information is collected from the customer during registration and during checkout process.",
    dataTransferInfo:
      "Customer data is managed by Pulikka.fi, payment intermediary Visma and website host Google LLC. Information is not disclosed to third parties. Information is kept partly in a database hosted by Google LLC. Data processing terms for that can be found here:",
    securityInfo: "The registrar uses adequate data protection to secure customer data.",
    inspectionAndRectificationInfo:
      "The customer has the right inspect personal data held in the register and receive a copy of the information. The information may be requested once a year by contacting customer support. The customer can request rectification of information.",
    businessId: "Business ID",
  },
  fi: {
    orderFailed: "Tilauksen tekeminen ei onnistunut. Yritä myöhemmin uudelleen.",
    backToCheckout: "Takaisin ostosivulle",
    privacyStatement: "Tietosuojaseloste",
    termsAndConditions: "Sopimusehdot",
    agreement: "Sopimus",
    agreementInfo:
      "Käyttämällä Pulikka-sovellusta hyväksyt nämä ehdot ja sitoudut noudattamaan niitä. Code Fuzz, Y-tunnus 2935633-4, ei ole vastuussa sovelluksen raportoimien tietojen oikeellisuudesta. Käyttäjän tulee aina tarkastaa sovelluksen raportoimat tiedot ennen niiden käyttämistä sovelluksen ulkopuolella.",
    alterations: "Muutokset",
    alterationsInfo:
      "Tarjoaja pidättää oikeuden muuttaa näitä sopimusehtoja julkaisemalla päivitetyt ehdot tällä verkkosivustolla. Tutustu voimassa oleviin ehtoihin tällä sivustolla ennen palvelun tilaamista. Muutoksista ilmoitetaan erikseen asiakkaille. Jatkamalla sovelluksen käyttöä hyväksyt käyttöehdot.",
    registration: "Rekisteröityminen",
    registrationInfo:
      "Rekisteröityminen verkkosivustolle vaatii voimassa olevan sähköpostiosoitteen.",
    applicationUsage: "Sovelluksen käyttäminen",
    applicationUsageInfo:
      "Sovelluksen käyttämiseksi asiakas tarvitsee internet-yhteyden ja ajopäiväkirjan pitämiseen laitteen käyttöoikeuden laitteen GPS-sijainnin lukemiseen. GPS-sijaintia käytetään sijainnin määrittämiseen ajosuoritteen alussa ja lopussa.",
    ordering: "Tilaaminen",
    orderingInfo:
      "Sovelluksen käyttöoikeus määräaikainen. Sovelluksen voi tilata joko 3 tai 12 kuukaudeksi kerrallaan. Asiakkaan tulee uusia tilaus jakson päätyttyä jatkaakseen sovelluksen käyttöä. Ilmaisen kokeilun jälkeen sovellus on asiakkaan käytettävissä välittömästi maksutapahtuman onnistuttua.",
    payments: "Maksut",
    paymentsInfo:
      "Verkkokaupan maksuvälittäjänä toimii Visma Pay (Paybyway Oy, y-tunnus 2486559-4), joka on rekisteröity Finanssivalvonnan ylläpitämään maksulaitosrekisteriin. Maksamiseen siirrytään Visma Payn verkkopalvelun kautta ja tiliotteella ja laskulla maksun saajana näkyy Visma Pay tai Paybyway Oy. Visma Pay välittää maksut verkkokauppiaalle. Maksaminen on turvallista, sillä kaikki maksutapahtumaa koskevat tiedot välitetään salattua yhteyttä käyttäen niin ettei kukaan ulkopuolinen taho näe maksutapahtuman tietoja. Kauppa syntyy verkkokaupan asiakkaan ja verkkokaupan välille. Verkkokaupan vastuulla ovat kaikki kauppaan liittyvät velvoitteet.",
    paymentsInfo2: "Lue lisää Visma Paysta ",
    paymentsInfoHere: "täällä",

    paymentsInfo3:
      "Visma Pay -palvelun kautta voit maksaa verkkopankkitunnuksilla, lompakolla, maksukorteilla (credit/debit), laskulla tai osamaksulla. Käytettävissä ovat seuraavat maksutavat: Osuuspankki, Nordea, Danske Bank, Oma Säästöpankki, Säästöpankki, Aktia, Paikallisosuuspankit, S-Pankki, Handelsbanken, Ålandsbanken, MobilePay, Masterpass, Pivo, Visa-, Visa Debit-, Visa Electron-, MasterCard- ja Debit MasterCard -kortit, sekä Jousto ja Enterpay Lasku yritykselle.",
    registrar: "Rekisterin pitäjä",
    registerName: "Rekisterin nimi",
    registerNameInfo: "Pulikka.fi asiakasrekisteri",
    purposeOfTheRegister:
      "Keräämme henkilötietoja asiakassuhteen hoitamista varten. Henkilötietojen käsittelyn oikeusperusteena on meidän välinen sopimus ja siitä johtuvat lakisääteiset velvoitteet. Henkilötietojen antaminen on edellytys sopimuksen syntymiselle. Toisin sanoen et voi tilata verkkokaupastamme tavaroita, jos et anna henkilötietojasi. Henkilötietojen käsittelyn oikeusperusteena on suostumus. Emme tee sinua koskevia profilointeja ja automaattisia päätöksiä.",
    sourcesOfInformationInfo:
      "Rekisteriin tallennettavat tiedot saadaan asiakkaalta tämän rekisteröityessä palveluun ja tilauksen tekemisen yhteydessä.",
    dataTransferInfo:
      "Tietojasi käsittelevät yrityksemme ja sen työntekijät, maksunvälittäjä Visma ja IT-yritys (Google LLC) joka ylläpitää verkkosivuja. Tietoja ei luovuteta ulkopuolisille tahoille. Tietoja säilytetään palvelussa, jonka tarjoaa Google LLC. Sitä koskevat ehdot löytyy täältä:",
    securityInfo:
      "Rekisterinpitäjä varmistaa asiakkaiden henkilötietojen käsittelyn tietoturvallisuuden ja henkilötietojen luottamuksellisuuden huolehtimalla asianmukaisesta tietoturvasta.",
    inspectionAndRectificationInfo:
      "Asiakkaalla on tietojensa tarkastusoikeus. Tiedot voidaan pyytää asiakaspalvelusta kerran vuodessa. Asiakkaalla on oikeus korjata tietojansa.",
    businessId: "Y-tunnus",
  },
});

export default strings;