import React from "react";

import Modal from "react-bootstrap/Modal";

export default function ModalSuccess(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 style={{ textAlign: "center", margin: 0 }}>{props.message}</h4>
      </Modal.Body>
    </Modal>
  );
}
