import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext({});

const GlobalStateProvider = ({ children }) => {
  const [activeUntil, setActiveUntil] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [projects, setProjects] = useState([]);
  const [workTimes, setTimesheets] = useState([]);
  const [invitationToken, setInvitationToken] = useState("");
  const [language, setLanguage] = useState("fi");
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  const values = {
    activeUntil,
    setActiveUntil,
    isActive,
    setIsActive,
    projects,
    setProjects,
    workTimes,
    setTimesheets,
    invitationToken,
    setInvitationToken,
    language,
    setLanguage,
    cookiesAccepted,
    setCookiesAccepted,
  };

  return <GlobalStateContext.Provider value={values}>{children}</GlobalStateContext.Provider>;
};

export function useGSC() {
  return useContext(GlobalStateContext);
}

export default GlobalStateProvider;
