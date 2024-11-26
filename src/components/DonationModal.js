import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PaymentQRCode from "./QRCodeComponent";

function DonationModal({
  showModal,
  setShowModal,
  selectedGift,
  handleSubmit,
  formData,
  handleChange,
  setFormData,
}) {
  const maxQuantity =
    selectedGift && !isNaN(selectedGift[3]) && !isNaN(selectedGift[4])
      ? selectedGift[3] - selectedGift[4]
      : 0;

  const totalValue =
    selectedGift && !isNaN(selectedGift[5]) && !isNaN(formData.quantidade)
      ? (selectedGift[5] * formData.quantidade).toFixed(2)
      : 0;

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const currentDate = formatDate(new Date());

  useEffect(() => {
    if (selectedGift) {
      setFormData((prevState) => ({
        ...prevState,
        item: selectedGift[1],
        quantidade: 1,
        tipoDoacao: "",
        data: currentDate,
        id: selectedGift[0],
      }));
    }
  }, [selectedGift, setFormData]);

  const closeModal = () => setShowModal(false);

  const handleCopy = () => {
    navigator.clipboard.writeText();
    alert("QRCode copiado para a área de transferência!");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.id ||
      !formData.item ||
      !formData.doador ||
      !formData.quantidade ||
      !formData.data ||
      !formData.tipoDoacao
    ) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    handleSubmit(formData);
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedGift ? selectedGift[1] : "Item Indefinido"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <img
            src={selectedGift ? selectedGift[6] : "#"}
            alt={selectedGift ? selectedGift[1] : "Indefinido"}
            style={{ width: "200px", height: "auto" }}
          />
        </div>
        <div className="d-flex gap-3">
          <p>
            <strong>Quantidade Máxima:</strong>{" "}
            {selectedGift ? selectedGift[3] : "Indefinido"}
          </p>
          <p>
            <strong>Presenteado:</strong>{" "}
            {selectedGift ? selectedGift[4] : "Indefinido"}
          </p>
        </div>
        <p>
          <strong>Valor:</strong>{" "}
          {selectedGift ? `R$ ${selectedGift[5].toFixed(2)}` : "Indefinido"}
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="donorName">
            <Form.Label>
              <strong>Seu nome</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="doador"
              value={formData.doador}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="donationQuantity">
            <Form.Label>
              <strong>Quantidade</strong>
            </Form.Label>
            <Form.Control
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              min="1"
              max={maxQuantity}
              required
            />
          </Form.Group>
          <Form.Group controlId="donationType">
            <Form.Label>
              <strong>Tipo de Doação</strong>
            </Form.Label>
            <Form.Control
              as="select"
              name="tipoDoacao"
              value={formData.tipoDoacao}
              onChange={handleChange}
              required
            >
              <option value="">Selecione aqui</option>
              <option value="Pix">Pix</option>
              <option value="Comprar">Comprar Presente (levar em mãos)</option>
            </Form.Control>
          </Form.Group>
          <Form.Control
            type="hidden"
            name="data"
            value={currentDate}
            required
          />
          {formData.tipoDoacao === "" && selectedGift && selectedGift[5] && (
            <div>
              <strong>Selecione o tipo de presente</strong>
            </div>
          )}

          {formData.tipoDoacao === "Pix" && selectedGift && selectedGift[5] && (
            <Form.Group>
              <Form.Label className="mt-3">
                <strong>Valor Total:</strong>{" "}
                {typeof selectedGift[5] === "number" &&
                typeof formData?.quantidade === "number"
                  ? `R$ ${(selectedGift[5] * formData.quantidade).toFixed(2)}`
                  : "Indefinido"}
              </Form.Label>
              <div>
                <div>
                  <strong>Presentar com Pix:</strong>
                </div>
                <div className="d-flex justify-content-center">
                  <PaymentQRCode
                    valorTotal={selectedGift[5] * (formData?.quantidade || 1)} // Garante valor padrão
                  />
                </div>
              </div>
            </Form.Group>
          )}

          {formData.tipoDoacao === "Comprar" &&
            selectedGift &&
            selectedGift[2] && (
              <Form.Group>
                <Form.Label className="mt-3">
                  <strong>Valor Total:</strong>{" "}
                  {typeof selectedGift[5] === "number" &&
                  typeof formData?.quantidade === "number"
                    ? `R$ ${(selectedGift[5] * formData.quantidade).toFixed(2)}`
                    : "Indefinido"}
                </Form.Label>
                <div>
                  <strong>Sugestão de Link:</strong>
                  <a
                    href={selectedGift[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar página
                  </a>
                </div>
              </Form.Group>
            )}

          <Button className="btn-custom mt-4" type="submit">
            Confirmar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default DonationModal;
