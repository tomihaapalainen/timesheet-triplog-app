import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AppPage from "./pages/app/AppPage";
import SignInPage from "./pages/authentication/SignInPage";
import SignUpPage from "./pages/authentication/SignUpPage";
import WorkTimePage from "./pages/app/WorkTimePage";
import TripLogPage from "./pages/app/TripLogPage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/routes/PrivateRoute";
import SignInRoute from "./components/routes/SignInRoute";
import NavigationBar from "./components/nav/NavigationBar";
import GlobalStateProvider from "./store/GlobalStateProvider";
import UserDataPage from "./pages/app/UserDataPage";
import { Application } from "react-rainbow-components";
import ResetPasswordPage from "./pages/authentication/ResetPasswordPage";
import DownloadReports from "./pages/app/DownloadReports";
import PurchasePage from "./pages/purchase/PurchasePage";
import CheckoutPage from "./pages/purchase/CheckoutPage";
import ConfirmationPage from "./pages/purchase/ConfirmationPage";
import TermsAndDataProtectionPage from "./pages/purchase/TermsAndDataProtectionPage";
import CheckoutRedirectPage from "./pages/purchase/CheckoutRedirectPage";

const theme = {
  rainbow: {
    palette: {
      brand: "#07689f",
    },
  },
};

function App() {
  return (
    <Router>
      <GlobalStateProvider>
        <AuthProvider>
          <Application theme={theme} style={{ fontSize: 16 }}>
            <NavigationBar />
            <Switch position="fixed">
              <Route path="/reset-password" component={ResetPasswordPage} />
              <Route path="/terms" component={TermsAndDataProtectionPage} />
              <PrivateRoute path="/app/checkout-redirect" component={CheckoutRedirectPage} />
              <PrivateRoute path="/app/order-confirmation" component={ConfirmationPage} />
              <PrivateRoute path="/app/checkout" component={CheckoutPage} />
              <PrivateRoute path="/app/purchase" component={PurchasePage} />
              <PrivateRoute path="/app/downloads" component={DownloadReports} />
              <PrivateRoute path="/app/userdata" component={UserDataPage} />
              <PrivateRoute path="/app/worktime" component={WorkTimePage} />
              <PrivateRoute path="/app/triplog" component={TripLogPage} />
              <PrivateRoute path="/app" component={AppPage} />
              <SignInRoute path="/register" component={SignUpPage} />
              <SignInRoute path="/" component={SignInPage} />
            </Switch>
          </Application>
        </AuthProvider>
      </GlobalStateProvider>
    </Router>
  );
}

export default App;
