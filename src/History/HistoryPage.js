import React from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useGSC } from "../store/GlobalStateProvider";
import strings from "./components/strings";
import TripdataContainer from "./components/TripdataContainer";
import WorkdataContainer from "./components/WorkdataContainer";
import HistoryStateProvider from "./HistoryStateProvider";

export default function HistoryPage() {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <HistoryStateProvider>
      <Container className="mt-3" style={{ maxWidth: "500px" }}>
        <Tabs className="bg-secondary" fill justify defaultActiveKey="workdata">
          <Tab
            className="font-weight-bold"
            mountOnEnter
            eventKey="workdata"
            title={strings.workdata}
          >
            <WorkdataContainer />
          </Tab>
          <Tab
            className="font-weight-bold"
            mountOnEnter
            eventKey="tripdata"
            title={strings.tripdata}
          >
            <TripdataContainer />
          </Tab>
        </Tabs>
      </Container>
    </HistoryStateProvider>
  );
}
