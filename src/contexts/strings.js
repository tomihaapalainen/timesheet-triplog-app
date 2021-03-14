import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    errorSigningUp: "Signing up for the app failed. Please try again later",
  },
  fi: {
    errorSigningUp:
      "Tilin rekisteröiminen sovellukseen ei onnistunut. Ole hyvä ja yritä myöhemmin uudelleen",
  },
});

export default strings;
