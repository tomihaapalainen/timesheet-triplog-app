import React from "react";
import Helmet from "react-helmet";
import "./styles.css";
import { useGSC } from "../store/GlobalStateProvider";
import Header from "./components/Header";
import AppInfo from "./components/AppInfo";
import Pricing from "./components/Pricing";
import Footer from "../Navigation/Footer";

export default function LandingPage() {
  const { language } = useGSC();

  return (
    <>
      <Helmet>
        <title>Pulikka.fi - Helppokäyttöinen ja halpa työajanseuranta ja ajopäiväkirja</title>
        <meta
          name="description"
          content="Pulikka.fi on helppokäyttöinen ja halpa työajanseuranta ja ajopäiväkirja yhdessä paikassa. Tutustu 30 päivää ilmaiseksi."
        />
      </Helmet>
      <Header language={language} />
      <AppInfo />
      <Pricing language={language} />
      <div className="my-5" />
      <Footer />
    </>
  );
}
