import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Check from "./Check";

const apiPresence = process.env.REACT_APP_SCRIPT_URL;

function PresenceModal({ show, handleClose, handleConfirm }) {
  const [formData, setFormData] = useState({
    formType: "presenca",
    nome: "",
    guests: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.nome || formData.guests < 0) {
      setError("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(apiPresence, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      const result = await response.json();

      if (result.status === "success") {
        document.getElementById("formPresenca").style.display = "none";
        document.getElementById("formEnviado").style.display = "block";
        setFormData({
          formType: "presenca",
          nome: "",
          guests: "0",
        });
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        alert("Erro ao enviar os dados: " + result.message);
      }
    } catch (error) {
      console.error("Erro:", error);
      setError(`Erro ao enviar dados: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <div id="formPresenca">
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
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGuests" className="mt-3">
              <Form.Label>Quantos acompanhantes?</Form.Label>
              <Form.Control
                name="guests"
                type="number"
                placeholder="Digite a quantidade de acompanhantes"
                value={formData.guests}
                onChange={handleChange}
                min="0"
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn-custom mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Confirmar"}
            </Button>
          </Form>
        </Modal.Body>
      </div>
      <div id="formEnviado" style={{ display: "none" }}>
        <Modal.Header closeButton>
          <div
            className="d-flex gap-2 align-items-center"
            style={{ height: "100px" }}
          >
            <Check />
            Presença confirmada!
          </div>
        </Modal.Header>
      </div>
    </Modal>
  );
}

export default PresenceModal;
