import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const apiPresence = process.env.REACT_APP_SCRIPT_URL; 

function PresenceModal({ show, handleClose, handleConfirm }) {
  const [nome, setName] = useState(""); 
  const [guests, setGuests] = useState(0); 
  const [error, setError] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation for name and guests
    if (!nome || guests < 0) {
      setError("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setError(null); // Reset error state before sending the request
    setIsSubmitting(true); // Disable the submit button

    const data = {
      formType: "presenca",
      nome: nome,
      guests: guests,
    };

    try {
      const response = await fetch(apiPresence, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Presença registrada com sucesso:", result);
        handleConfirm(data); 
        handleClose();
        setName("");
        setGuests(0);
      } else {
        throw new Error(result.message || "Erro ao registrar presença");
      }

    } catch (error) {
      console.error("Erro:", error);
      setError(`Erro ao enviar dados: ${error.message}`);
    } finally {
      setIsSubmitting(false); // Enable the submit button again after request is done
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Presença</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              value={nome}
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
              onChange={(e) => setGuests(Number(e.target.value))}
              min={0}
              required
            />
          </Form.Group>
          <Button type="submit" className="btn-custom mt-3" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Confirmar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PresenceModal;
