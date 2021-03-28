import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
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
import TermsAndConditionsPage from "./TermsAndConditions/TermsAndConditionsPage";
import SuccessPage from "./Purchase/SuccessPage";

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
              <Route path="/terms" component={TermsAndConditionsPage} />
              <PrivateRoute path="/app/successful-purchase" component={SuccessPage} />
              <PrivateRoute path="/app/purchase" component={PurchasePage} />
              <PrivateRoute path="/app/reports" component={ReportsPage} />
              <PrivateRoute path="/app/userdata" component={UserDataPage} />
              <PrivateRoute path="/app/worktime" component={TimesheetPage} />
              <PrivateRoute path="/app/triplog" component={TripLogPage} />
              <PrivateRoute path="/app" component={LandingPage} />
              <SignInRoute path="/register" component={SignUpPage} />
              <SignInRoute path="/" component={SignInPage} />
            </Switch>
          </Application>
        </AuthProvider>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}

export default App;
