import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    months: "months",
    yourPrice: "Your price",
    moveToCheckout: "Checkout",
    purchase: "Pay",
    errorLoadingOfferings: "Error loading offerings. Please try again later.",
    pickOrderDurationAndProceedToCheckout: "Pick your order duration and proceed to checkout",
    pricesIncludeVAT: "Prices include VAT 24%.",
    paymentInfo:
      "Right to use the application is paid upfront for the selected duration, and the right will become effective immediately after a successful checkout. In case you are unable to use the application within 24 hours, please contact customer suppport at ",
    noRefunds: "Notice that paid subscriptions will not be refunded.",
    customerServiceEmail: "asiakaspalvelu@pulikka.fi",
    unavailable: "Purchase unavailable.",
    threeMonthInfo:
      "3 month subscription is a recurring payment that will be charged from your card at the start of each billing period. You may cancel the subscription at any time: the subscription ends at the end of your last billed period. Billed subscriptions cannot be refunded.",
    annualInfo:
      "12 month order will be charged beforehand. Payment is non-recurring: the payment must be made again at the end of your billing period in order to keep using the application.",
    threeMonths: "3 months recurring",
    twelveMonths: "12 months one time payment",
    month: "month",
    errorCheckingOut: "Error when transferring to checkout:",
  },
  fi: {
    months: "kuukautta",
    yourPrice: "Hintasi",
    moveToCheckout: "Siirry maksamaan",
    purchase: "Maksa",
    errorLoadingOfferings:
      "Virhe ladattaessa ostotarjouksia. Ole hyvä, ja yritä myöhemmin uudelleen",
    pickOrderDurationAndProceedToCheckout: "Valitse tilausjakson pituus ja siirry maksamaan",
    pricesIncludeVAT: "Hinnat sisältävät alv. 24%.",
    paymentInfo:
      "Palvelun käyttöoikeus maksetaan ajanjaksolle ennakkoon, ja käyttöoikeus astuu voimaan välittömästi onnistuneen maksutapahtuman jälkeen. Mikäli et saa palvelua käyttöösi 24 tunnin sisällä, ota yhteyttä asiakaspalveluun: ",
    noRefunds: "Huomaa, että jo maksetulla käyttöoikeudella ei ole palautusoikeutta.",
    customerServiceEmail: "asiakaspalvelu@pulikka.fi",
    unavailable: "Ostaminen ei ole käytössä.",
    threeMonthInfo:
      "3 kuukauden tilaus on jatkuva. Maksu veloitetaan tililtäsi jokaisen maksukauden alussa. Voit peruuttaa tilauksen milloin vain: tilaus päättyy viimeisen maksetun tilausjakson päättymiseen. Jo maksettuja tilauksia ei palauteta.",
    annualInfo:
      "12 kuukauden tilaus suoritetaan etukäteen kertamaksulla. Maksu täytyy uusia erikseen tilausjakson päätyttyä mikäli sovelluksen käyttöä halutaan jatkaa.",
    threeMonths: "3 kuukauden jatkuva tilaus",
    twelveMonths: "12 kuukautta kertamaksulla",
    month: "kk",
    errorCheckingOut: "Virhe siirryttäessä maksunvälittäjän palveluun:",
  },
});

export default strings;
