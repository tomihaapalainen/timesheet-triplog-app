import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import strings from "./strings";

export default function ConfirmRemoveProjectModal({ show, setShow, removeProject, projectId }) {
  const handleClose = () => {
    setShow(false);
  };

  const handleRemove = async () => {
    handleClose();
    await removeProject(projectId);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="bg-danger text-dark" closeButton>
        <Modal.Title>{strings.removeProject}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontSize: 16 }}>{strings.removeProjectNote}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="text-uppercase float-start" onClick={handleClose}>
          {strings.close}
        </Button>
        <div style={{ flex: 1 }} />
        <Button variant="danger" className="text-uppercase font-weight-bold" onClick={handleRemove}>
          {strings.remove}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
