import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./Landing/LandingPage";
import SignInPage from "./Authentication/SignInPage";
import SignUpPage from "./Authentication/SignUpPage";
import WorkTimePage from "./WorkTime/WorkTimePage";
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
import CancelPage from "./Purchase/CancelPage";

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
              <PrivateRoute path="/app/purchase-cancelled" component={CancelPage} />
              <PrivateRoute path="/app/successful-purchase" component={SuccessPage} />
              <PrivateRoute path="/app/purchase" component={PurchasePage} />
              <PrivateRoute path="/app/downloads" component={ReportsPage} />
              <PrivateRoute path="/app/userdata" component={UserDataPage} />
              <PrivateRoute path="/app/worktime" component={WorkTimePage} />
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
