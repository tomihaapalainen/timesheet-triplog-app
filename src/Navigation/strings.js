import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    timesheet: "Timesheet",
    tripLog: "Trip log",
    reports: "Reports",
    profile: "Profile",
    signOut: "Sign out",
    purchase: "Purchase",
    privacyStatement1: "Privacy statement",
    privacyStatement2: "",
    terms1: "Terms and",
    terms2: "conditions",
  },
  fi: {
    timesheet: "Työajanseuranta",
    tripLog: "Ajopäiväkirja",
    reports: "Raportit",
    profile: "Profiili",
    signOut: "Kirjaudu ulos",
    purchase: "Osta",
    privacyStatement1: "Rekisteri- ja",
    privacyStatement2: "tietosuojaseloste",
    terms1: "Sopimusehdot",
    terms2: "",
  },
});

export default strings;
