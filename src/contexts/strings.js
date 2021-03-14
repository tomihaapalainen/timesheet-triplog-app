import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    errorSigningUp: "Signing up for the app failed. Please try again later",
    checkEmailAndPassword: "Invalid email address or password",
  },
  fi: {
    errorSigningUp:
      "Tilin rekisteröiminen sovellukseen ei onnistunut. Ole hyvä ja yritä myöhemmin uudelleen",
    checkEmailAndPassword: "Sähköposti tai salasana on väärin",
  },
});

export default strings;
