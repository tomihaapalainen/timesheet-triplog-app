import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    lastMonth: "Last month",
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
    lastMonth: "Viime kk",
    thisMonth: "Tämä kk",
    startingDate: "Alku päivämäärä",
    endingDate: "Loppu päivämäärä",
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
