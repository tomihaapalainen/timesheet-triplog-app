import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    accountNoLongerActive:
      "Your account is no longer active. Purchase again to keep using the application.",
    errorSavingTrip: "Saving your trip failed. Please try again later.",
    description: "Description",
    kilometerage: "Kilometerage",
    tripStarted: "Trip started",
    tripEnded: "Trip ended",
    vehicle: "Vehicle (license plate)",
  },
  fi: {
    accountNoLongerActive:
      "Tilisi ei ole enää aktiivinen. Osta sovelluksen käyttöoikeus jatkaaksesi käyttöä.",
    errorSavingTrip: "Matkan tallentaminen ei onnistunut. Yritä myöhemmin uudelleen.",
    description: "Kuvaus",
    kilometerage: "Mittarilukema",
    tripStarted: "Matka aloitettu",
    tripEnded: "Matka päättynyt",
    vehicle: "Ajoneuvo (rek. nro)",
  },
});

export default strings;