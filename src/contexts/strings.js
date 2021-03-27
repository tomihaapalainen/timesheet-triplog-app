import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    errorSigningUp: "Signing up for the app failed. Please try again later",
    emailIsNotVerified:
      "Please verify your email by clicking the link sent to your email in order to sign in.",
  },
  fi: {
    errorSigningUp:
      "Tilin rekisteröiminen sovellukseen ei onnistunut. Ole hyvä ja yritä myöhemmin uudelleen",
    emailIsNotVerified:
      "Ole hyvä ja vahvista sähköpostiosoitteesi klikkaamalla sinne lähetettyä linkkiä, jotta pääset kirjautumaan sisään.",
  },
});

export default strings;
