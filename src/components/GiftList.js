import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function GiftList() {
  const [gifts, setGifts] = useState([]); // Lista de presentes
  const [loading, setLoading] = useState(true); // Para controlar o carregamento
  const [error, setError] = useState(null); // Para capturar erros
  const [selectedGift, setSelectedGift] = useState(null); // Presente selecionado
  const [showModal, setShowModal] = useState(false); // Controle do modal
  const [formData, setFormData] = useState({
    id: "", // Este campo será preenchido dinamicamente
    item: "",
    doador: "",
    quantidade: "",
    data: new Date().toISOString().split("T")[0], // Data atual no formato yyyy-mm-dd
    tipoDoacao: "Pix", // Tipo de doação padrão
  });

  const apiUrl =
    "https://script.google.com/macros/s/AKfycbxc8j5kbot132kkMZgjyLrZE4qOvC0mBEp4WdNaagUZ_KmxtA-dK_2KDxcHPxqo2SZM/exec";

  // Função para buscar os dados da API
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      const { presentes } = response.data;
      setGifts(presentes || []); // Garantir que gifts seja um array
      setLoading(false);
    } catch (err) {
      setError("Não foi possível carregar a lista de presentes.");
      setLoading(false);
    }
  };

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para processar a doação
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação para garantir que todos os campos estão preenchidos
    if (!formData.doador || !formData.quantidade || !formData.tipoDoacao) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    // Se o ID não foi fornecido, gera um ID único
    if (!formData.id) {
      formData.id = `ID-${new Date().getTime()}`; // Gerando ID com base no timestamp atual
    }

    // Verifica se a quantidade de doação é válida
    const availableQuantity =
      selectedGift?.maxQuantity > 0
        ? selectedGift.maxQuantity - selectedGift.donated
        : Infinity;
    if (formData.quantidade > availableQuantity) {
      alert(
        `A quantidade máxima disponível para doação é ${availableQuantity}.`
      );
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData), // Formata os dados corretamente para envio
      });

      // Aguarda a resposta do Google Apps Script
      const result = await response.json(); // Tenta converter a resposta em JSON

      // Verifica o status da resposta
      if (result.status === "success") {
        alert("Dados enviados com sucesso!");
        setFormData({
          id: "",
          item: "",
          doador: "",
          quantidade: 1,
          data: new Date().toISOString().split("T")[0], // Reseta a data para o valor padrão
          tipoDoacao: "Pix",
        });
        setShowModal(false); // Fecha o modal após a doação
        fetchData(); // Atualiza a lista de presentes
      } else {
        alert("Erro ao enviar os dados: " + result.message); // Exibe o erro, caso não tenha sucesso
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar os dados."); // Alerta geral em caso de falha na requisição
    }
  };

  // Carregar os dados ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  // Se estiver carregando ou houver erro
  if (loading) return <p>Carregando lista de presentes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Presentes</h2>
      <div className="row justify-content-center">
        {gifts.map((gift) => {
          const maxQuantity = Number(gift[3]) || 0; // Interpreta vazio ou 0 como ilimitado
          const donatedQuantity = Number(gift[4]) || 0; // Quantidade doada
          const isDisabled = maxQuantity > 0 && donatedQuantity >= maxQuantity;

          return (
            <div key={gift[0]} className="col-8 col-md-4 mb-4">
              <div className="card">
                <h5 className="card-title">{gift[1]}</h5>
                <img
                  src={gift[2]}
                  className="card-img-top"
                  alt={gift[1]}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p className="card-text">
                    <strong>Valor:</strong> R${gift[5]}
                  </p>
                  <p className="card-text">
                    {maxQuantity === 0 ? (
                      <span>
                        <strong>Presenteado:</strong> {donatedQuantity}
                      </span>
                    ) : (
                      <span>
                        <strong>Máximo:</strong> {maxQuantity} |{" "}
                        <strong>Presenteado:</strong> {donatedQuantity}
                      </span>
                    )}
                  </p>

                  <div className="d-flex justify-content-between">
                    <button
                      className={`btn btn-sm ${
                        isDisabled ? "btn-secondary" : "btn-primary"
                      }`}
                      disabled={isDisabled}
                      onClick={() => {
                        setSelectedGift({
                          id: gift[0],
                          item: gift[1],
                          maxQuantity: maxQuantity,
                          donated: donatedQuantity,
                        });
                        setFormData((prevState) => ({
                          ...prevState,
                          id: gift[0],
                          item: gift[1],
                        }));
                        setShowModal(true);
                      }}
                    >
                      {isDisabled ? "Indisponível" : "Presentear"}
                    </button>
                    {gift[2] && (
                      <a
                        href={gift[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-link"
                      >
                        Comprar
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Doação de {selectedGift?.item || "Item Indefinido"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGift && (
            <>
              <p>
                <strong>Nome do item:</strong> {selectedGift.item}
              </p>
              <p>
                <strong>Quantidade máxima:</strong>{" "}
                {selectedGift.maxQuantity || "Ilimitada"}
              </p>
              <p>
                <strong>Quantidade já doada:</strong> {selectedGift.donated}
              </p>
              <hr />
            </>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="donorName">
              <Form.Label>Seu nome</Form.Label>
              <Form.Control
                type="text"
                name="doador"
                placeholder="Digite seu nome"
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
                max={
                  selectedGift?.maxQuantity > 0
                    ? selectedGift.maxQuantity - selectedGift.donated
                    : undefined
                }
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
                <option value="Compra online">Compra online</option>
              </Form.Control>
            </Form.Group>

            <Button className="mt-4" variant="primary" type="submit">
              Confirmar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default GiftList;
