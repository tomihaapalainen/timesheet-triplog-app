import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { auth, googleAuthProvider } from "../firebase";
import { baseUrl } from "../config";
import strings from "./strings";
import { useGSC } from "../store/GlobalStateProvider";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const { language } = useGSC();
  strings.setLanguage(language);

  const history = useHistory();

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signout = () => {
    return auth.signOut();
  };

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const resetPassword = (email, url) => {
    return auth.sendPasswordResetEmail(email, { url: url });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user === null || user.emailVerified) {
        setCurrentUser(user);
        setLoading(false);
        return;
      }

      user.sendEmailVerification({ url: `${window.location.origin}` });
      alert(strings.emailIsNotVerified);
      signout();
    });

    const handleSignInWithRedirectResult = async () => {
      let userCredential = await auth.getRedirectResult();
      if (userCredential.user === null) {
        return;
      }

      if (userCredential.additionalUserInfo.isNewUser) {
        let referrerToken = sessionStorage.getItem("referrer_token");
        let response = await axios.post(`${baseUrl}/users`, {
          email: userCredential.user.email,
          referrer_token: referrerToken || "",
        });

        if (response.status === 200) {
          history.push("/app");
        } else {
          alert(strings.errorSigningUp);
          await signout();
          history.push("/");
        }
      }
    };

    handleSignInWithRedirectResult();
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    await auth.signInWithRedirect(googleAuthProvider);
  };

  const value = {
    currentUser,
    signin,
    signout,
    signup,
    resetPassword,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
