import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignInRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return !currentUser ? <Component {...props} /> : <Redirect to="/app" />;
      }}
    ></Route>
  );
};

export default SignInRoute;
