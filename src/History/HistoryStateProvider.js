import React, { createContext, useContext, useState } from "react";

const HistoryStateContext = createContext({});

const HistoryStateProvider = ({ children }) => {
  const [currentWorkdata, setCurrentWorkdata] = useState([]);
  const [currentTripdata, setCurrentTripdata] = useState([]);
  const [openWorkdata, setOpenWorkdata] = useState(null);
  const [openTripdata, setOpenTripdata] = useState(null);

  const values = {
    currentWorkdata,
    setCurrentWorkdata,
    currentTripdata,
    setCurrentTripdata,
    openWorkdata,
    setOpenWorkdata,
    openTripdata,
    setOpenTripdata,
  };

  return <HistoryStateContext.Provider value={values}>{children}</HistoryStateContext.Provider>;
};

export function useHistoryStateContext() {
  return useContext(HistoryStateContext);
}

export default HistoryStateProvider;
