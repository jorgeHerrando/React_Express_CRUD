import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

import apiCalls from "../../apiCalls";

import modalStyles from "./ModalStyles.module.css";

export default function ModalDelete(props) {
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);

  const handleDelete = async () => {
    const response = await apiCalls.deleteProduct(props.id);
    if (response.status === 200) {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
        props.onHide();
        navigate("/");
      }, 2500);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {!message && (
          <p className={modalStyles.text}>
            ¿Está seguro de que desea eliminar este producto?
          </p>
        )}
        {message && (
          <p className={modalStyles.text}>Producto eliminado con éxito</p>
        )}
      </Modal.Body>
      {!message && (
        <Modal.Footer className={modalStyles.footer}>
          <Button
            onClick={handleDelete}
            className={`btn-danger ${modalStyles.btn}`}
          >
            Delete
          </Button>
          <Button
            onClick={props.onHide}
            className={`btn-secondary ${modalStyles.btn}`}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
