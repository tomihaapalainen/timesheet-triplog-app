import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppLandingPage from "./Landing/AppLandingPage";
import LandingPage from "./Landing/LandingPage";
import SignInPage from "./Authentication/SignInPage";
import SignUpPage from "./Authentication/SignUpPage";
import TimesheetPage from "./Timesheet/TimesheetPage";
import TripLogPage from "./TripLog/TripLogPage";
import PrivateRoute from "./Routes/PrivateRoute";
import SignInRoute from "./Routes/SignInRoute";
import NavigationBar from "./Navigation/NavigationBar";
import GlobalStateProvider from "./store/GlobalStateProvider";
import UserDataPage from "./UserData/UserDataPage";
import Application from "react-rainbow-components/components/Application";
import ResetPasswordPage from "./Authentication/ResetPasswordPage";
import ReportsPage from "./Reports/ReportsPage";
import PurchasePage from "./Purchase/PurchasePage";
import PrivacyStatementPage from "./TermsAndConditions/PrivacyStatementPage";
import TermsPage from "./TermsAndConditions/TermsPage";
import SuccessPage from "./Purchase/SuccessPage";
import HistoryPage from "./History/HistoryPage";
import CookiesPage from "./TermsAndConditions/CookiesPage";

const theme = {
  rainbow: {
    palette: {
      brand: "#07689f",
    },
  },
};

function App() {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <AuthProvider>
          <Application theme={theme} style={{ fontSize: 16 }}>
            <NavigationBar />
            <Switch position="fixed">
              <Route path="/reset-password" component={ResetPasswordPage} />
              <Route path="/cookies" component={CookiesPage} />
              <Route path="/privacy-statement" component={PrivacyStatementPage} />
              <Route path="/terms" component={TermsPage} />
              <PrivateRoute path="/app/history" component={HistoryPage} />
              <PrivateRoute path="/app/successful-purchase" component={SuccessPage} />
              <PrivateRoute path="/app/purchase" component={PurchasePage} />
              <PrivateRoute path="/app/reports" component={ReportsPage} />
              <PrivateRoute path="/app/userdata" component={UserDataPage} />
              <PrivateRoute path="/app/worktime" component={TimesheetPage} />
              <PrivateRoute path="/app/triplog" component={TripLogPage} />
              <PrivateRoute path="/app" component={AppLandingPage} />
              <SignInRoute path="/register" component={SignUpPage} />
              <SignInRoute path="/signin" component={SignInPage} />
              <SignInRoute path="/" component={LandingPage} />
            </Switch>
          </Application>
        </AuthProvider>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}

export default App;
