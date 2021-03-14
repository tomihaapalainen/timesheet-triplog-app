import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    months: "months",
    yourPrice: "Your price",
    purchase: "Purchase",
    errorLoadingOfferings: "Error loading offerings. Please try again later.",
    pickOrderDurationAndProceedToCheckout: "Pick your order duration and proceed to checkout",
    pricesIncludeVAT: "Prices include VAT 24%",
    paymentInfo:
      "Right to use the application is paid upfront for the selected duration, and the right will become effective immediately after a successful checkout. In case you are unable to use the application within 24 hours, please contact customer suppport at ",
    noRefunds: "Notice that paid subscriptions will not be refunded.",
    customerServiceEmail: "asiakaspalvelu@pulikka.fi",
  },
  fi: {
    months: "kuukautta",
    yourPrice: "Hintasi",
    purchase: "Osta",
    errorLoadingOfferings:
      "Virhe ladattaessa ostotarjouksia. Ole hyvä, ja yritä myöhemmin uudelleen",
    pickOrderDurationAndProceedToCheckout: "Valitse tilausjakson pituus ja siirry maksamaan",
    pricesIncludeVAT: "Hinnat sisältävät alv. 24%",
    paymentInfo:
      "Palvelun käyttöoikeus maksetaan ajanjaksolle ennakkoon, ja käyttöoikeus astuu voimaan välittömästi onnistuneen maksutapahtuman jälkeen. Mikäli et saa palvelua käyttöösi 24 tunnin sisällä, ota yhteyttä asiakaspalveluun: ",
    noRefunds: "Huomaa, että jo maksetulla käyttöoikeudella ei ole palautusoikeutta.",
    customerServiceEmail: "asiakaspalvelu@pulikka.fi",
  },
});

export default strings;
