import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    lastWeek: "Last week",
    lastMonth: "Last month",
    thisWeek: "This week",
    thisMonth: "This month",
    startingDate: "Starting date",
    endingDate: "Ending date",
    tripLog: "triplog",
    noTrips: "No trips",
    timesheet: "timesheet",
    noTimesheets: "No work times in selected interval",
    timesheetReport: "Timesheet report",
    tripLogBtn: "Trip log",
    pleaseSelectReportFormat: "Please select a report format",
  },
  fi: {
    lastWeek: "Viime viikko",
    lastMonth: "Viime kk",
    thisWeek: "Tämä viikko",
    thisMonth: "Tämä kk",
    startingDate: "Alku pvm.",
    endingDate: "Loppu pvm.",
    tripLog: "ajopaivakirja",
    noTrips: "Ei matkoja",
    timesheet: "tyoajanseuranta",
    noTimesheets: "Ei työaikoja valitulla aikavälillä",
    timesheetReport: "Työaikaraportti",
    tripLogBtn: "Ajopäiväkirja",
    pleaseSelectReportFormat: "Valitse raportin formaatti",
  },
});

export default strings;
