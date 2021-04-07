import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    months: "months",
    yourPrice: "Your price",
    moveToCheckout: "Checkout",
    choose: "Choose",
    errorLoadingOfferings: "Error loading offerings. Please try again later.",
    pickOrderDurationAndProceedToCheckout: "Pick your order duration and proceed to checkout",
    pricesIncludeVAT: "Prices include VAT 24%.",
    paymentInfo:
      "Right to use the application is paid upfront for the selected duration, and the right will become effective immediately after a successful checkout. In case you are unable to use the application within 24 hours, please contact customer suppport at ",
    noRefunds: "Notice that paid subscriptions will not be refunded.",
    customerServiceEmail: "asiakaspalvelu@pulikka.fi",
    purchaseInfo:
      "Order will be charged beforehand. The payment must be made again at the end of your billing period in order to keep using the application.",
    month: "month",
    errorCheckingOut: "Error when transferring to checkout:",
    purchaseSuccessful: "Purchase complete",
    thankYouForPurchasing: "Thank you for puchasing our product.",
    welcomeBack: "Welcome back to using pulikka!",
    terms: "Terms and conditions",
    privacyStatement: "Privacy statement",
  },
  fi: {
    months: "kuukautta",
    yourPrice: "Hintasi",
    moveToCheckout: "Siirry maksamaan",
    choose: "Valitse",
    errorLoadingOfferings:
      "Virhe ladattaessa ostotarjouksia. Ole hyvä, ja yritä myöhemmin uudelleen",
    pickOrderDurationAndProceedToCheckout: "Valitse tilausjakson pituus ja siirry maksamaan",
    pricesIncludeVAT: "Hinnat sisältävät alv. 24%.",
    paymentInfo:
      "Palvelun käyttöoikeus maksetaan ajanjaksolle ennakkoon, ja käyttöoikeus astuu voimaan välittömästi onnistuneen maksutapahtuman jälkeen. Mikäli et saa palvelua käyttöösi 24 tunnin sisällä, ota yhteyttä asiakaspalveluun: ",
    noRefunds: "Huomaa, että jo maksetulla käyttöoikeudella ei ole palautusoikeutta.",
    customerServiceEmail: "asiakaspalvelu@pulikka.fi",
    purchaseInfo:
      "Maksu suoritetaan etukäteen kortilla. Tilausjakson päätyttyä maksu on suoritettava uudelleen mikäli sovelluksen käyttöä halutaan jatkaa.",
    month: "kk",
    errorCheckingOut: "Virhe siirryttäessä maksunvälittäjän palveluun:",
    purchaseSuccessful: "Maksu suoritettu",
    thankYouForPurchasing: "Kiitos ostoksestasi.",
    welcomeBack: "Tervetuloa jatkamaan pulikan käyttöä!",
    terms: "Sopimusehdot",
    privacyStatement: "Rekisteri- ja tietosuojaseloste",
  },
});

export default strings;
