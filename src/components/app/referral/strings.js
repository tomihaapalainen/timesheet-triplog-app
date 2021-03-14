import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    inviteUsers: "Invite users",
    inviteInfo:
      "Send this link to a friend. You will receive a permanent 1 € discount on your annual price every time a user you invited makes their first purchase in the application. The invited user receives a 20% discount on their first purchase as well.",
    annualPriceInfo: "Annual price minimum 9.90 €",
    linkCopied: "Link copied to clipboard",
  },
  fi: {
    inviteUsers: "Kutsu käyttäjiä",
    inviteInfo:
      "Lähetä tämä linkki tuttavillesi. Saat pysyvän 1 € alennuksen vuosihintaasi jokaista kutsumaasi oston tehnyttä käyttäjää kohden! Kutsuttu käyttäjä saa 20% alennuksen ensimmäisestä ostoksestaan.",
    annualPriceInfo: "Vuosihinta alimmillaan 9,90 €",
    linkCopied: "Linkki kopioitu",
  },
});

export default strings;
