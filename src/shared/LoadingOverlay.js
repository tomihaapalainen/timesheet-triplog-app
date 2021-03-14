import React from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useGSC } from "../store/GlobalStateProvider";
import strings from "./strings";

export default function LoadingOverlay({ show }) {
  const { language } = useGSC();
  strings.setLanguage(language);

  return (
    <Modal show={show}>
      <Modal.Body
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" role="status" variant="primary" size={40}>
          <span className="sr-only">{strings.loading}</span>
        </Spinner>
      </Modal.Body>
    </Modal>
  );
}
