import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const apiPresenca = process.env.REACT_APP_SCRIPT_PRESENCE;

function PresenceModal({ show, handleClose, handleConfirm }) {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(0); 

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, guests };
    fetch(apiPresenca, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Success:", result);
        handleConfirm(data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(`Erro ao enviar dados: ${error.message}`);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Presença</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formGuests" className="mt-3">
            <Form.Label>Quantos acompanhantes?</Form.Label>
            <Form.Control
              name="guests"
              type="number"
              placeholder="Digite a quantidade de acompanhantes"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min={0}
              required
            />
          </Form.Group>
          <Button type="submit" className="btn-custom mt-3">
            Confirmar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PresenceModal;
