import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    projectCannotBeEmpty: "Project name cannot be empty",
    addingProjectFailed: "Adding project failed. Please try again later",
    addProject: "Add project",
    projectName: "Project name",
    hourlyRate: "Hourly rate",
    add: "Add",
    close: "Close",
    project: "Project",
    time: "Time",
  },
  fi: {
    projectCannotBeEmpty: "Projektin nimi on täytettävä",
    addingProjectFailed: "Projektin lisääminen ei onnistunut. Yritä myöhemmin uudelleen.",
    addProject: "Lisää projekti",
    projectName: "Projektin nimi",
    hourlyRate: "Tuntilaskutus",
    add: "Lisää",
    close: "Sulje",
    project: "Projekti",
    projects: "Projektit",
    time: "Aika",
  },
});

export default strings;
