import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import QRCodeComponent from "./QRCodeComponent";

function DonationModal({
  showModal,
  setShowModal,
  selectedGift,
  handleSubmit,
  formData,
  handleChange,
  setFormData,
}) {
  // Calcula a quantidade máxima disponível para doação
  const maxQuantity =
    selectedGift && !isNaN(selectedGift[3]) && !isNaN(selectedGift[4])
      ? selectedGift[3] - selectedGift[4]
      : 0;

  // Calcula o valor total da doação
  const totalValue =
    selectedGift && !isNaN(selectedGift[5]) && !isNaN(formData.quantidade)
      ? selectedGift[5] * formData.quantidade
      : 0;

  // Função para formatar a data no formato YYYY-MM-DD
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Para o formato "YYYY-MM-DD"
  };

  // Data atual
  const currentDate = formatDate(new Date());

  useEffect(() => {
    if (selectedGift) {
      // Quando um novo presente for selecionado, inicializamos o formData
      setFormData((prevState) => ({
        ...prevState,
        item: selectedGift[1], // Nome do item
        quantidade: 1, // Inicia com 1
        tipoDoacao: "Pix", // Tipo de doação inicial
        data: currentDate, // Preenche o campo data
        id: selectedGift[0], // ID do presente
      }));
    }
  }, [selectedGift, setFormData]);

  const closeModal = () => setShowModal(false);

  const handleCopy = (pixKey) => {
    navigator.clipboard.writeText(pixKey);
    alert("Chave Pix copiada para a área de transferência!");
  };

  // Alterando a forma como handleSubmit é chamado
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Verificar se todos os campos obrigatórios estão presentes
    if (
      !formData.id ||
      !formData.item ||
      !formData.doador ||
      !formData.quantidade ||
      !formData.data ||
      !formData.tipoDoacao
    ) {
      alert("Todos os campos são obrigatórios.");
      return; // Evita o envio do formulário se faltar algum campo
    }

    // Passa os dados para o backend
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
        {/* Exibe as informações do presente */}
        <p>
          <strong>Imagem:</strong>{" "}
          <img
            src={selectedGift ? selectedGift[2] : "#"}
            alt={selectedGift ? selectedGift[1] : "Indefinido"}
            style={{ width: "100%", height: "auto" }}
          />
        </p>
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

        {/* Exibe o valor total da doação */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="donorName">
            <Form.Label>Seu nome</Form.Label>
            <Form.Control
              type="text"
              name="doador"
              value={formData.doador}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="donationQuantity">
            <Form.Label>Quantidade</Form.Label>
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
            <Form.Label>Tipo de Doação</Form.Label>
            <Form.Control
              as="select"
              name="tipoDoacao"
              value={formData.tipoDoacao}
              onChange={handleChange}
              required
            >
              <option value="Pix">Pix</option>
              <option value="Comprar">Comprar Presente</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-3">
              <strong>Valor Total:</strong>{" "}
              {selectedGift && selectedGift[5]
                ? `R$ ${(selectedGift[5] * formData.quantidade).toFixed(2)}`
                : "Indefinido"}
            </Form.Label>
          </Form.Group>
          {/* Campo hidden para data */}
          <Form.Control
            type="hidden"
            name="data"
            value={currentDate}
            required
          />
          {formData.tipoDoacao === "Pix" && selectedGift && selectedGift[5] && (
            <div>
              <strong>Presentar com Pix:</strong>
              <QRCodeComponent
                pixCode={`00020126580014br.gov.bcb.pix0136${
                  selectedGift[6]
                }52040000530398654051${(
                  selectedGift[5] *
                  formData.quantidade *
                  100
                ).toFixed(
                  0
                )}5802BR5922Julia Cavalcante Silva6009Sao Paulo62070503***6304E2AB`}
              />
              {/* Exibe o QR Code do Pix com o código gerado */}
            </div>
          )}
          {formData.tipoDoacao === "Comprar" &&
            selectedGift &&
            selectedGift[2] && (
              <div>
                <strong>Sugestão de Link:</strong>
                <a
                  href={selectedGift[2]} // Usando o link de compra online
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acessar página
                </a>
              </div>
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
