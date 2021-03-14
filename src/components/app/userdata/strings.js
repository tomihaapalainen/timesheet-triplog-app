import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    accountActive: "Your account is active until",
    until: "",
    accountExpired: "Your account has expired on",
    deleteMyAccount: "Delete account",
    deleteNote:
      "Deleting your user account will remove all your data from the application. Are you sure you want to delete your account?",
    delete: "Delete my user account",
    password: "Password",
    checkPassword: "Invalid password",
    accountRemoved: "Your account has been removed",
  },
  fi: {
    accountActive: "Tilisi on aktiivinen",
    until: " asti",
    accountExpired: "Tilisi käyttöoikeus on päättynyt",
    deleteMyAccount: "Poista käyttäjätili",
    deleteNote:
      "Poistamalla tilisi kaikki sovelluksessa olevat tietosi poistetaan. Oletko varma, että halua poistaa tilisi?",
    delete: "Poista käyttäjätilini",
    password: "Salasana",
    checkPassword: "Tarkista salasana",
    accountRemoved: "Käyttäjätilisi on poistettu",
  },
});

export default strings;
