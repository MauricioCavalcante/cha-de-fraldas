import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import DonationModal from "./DonationModal"; // Importando a modal

function GiftList() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    item: "",
    doador: "",
    quantidade: "",
    data: new Date().toISOString().split("T")[0],
    tipoDoacao: "Pix",
  });

  const apiUrl = process.env.REACT_APP_SCRIPT_URL;

  // Fetch gifts from API
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      const { presentes } = response.data;
      console.log("Dados recebidos da API:", presentes);
      setGifts(presentes || []);
      setLoading(false);
    } catch (err) {
      setError("Não foi possível carregar a lista de presentes.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.doador || !formData.quantidade || !formData.tipoDoacao) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Dados enviados com sucesso!");
        setFormData({
          id: "",
          item: "",
          doador: "",
          quantidade: "",
          data: new Date().toISOString().split("T")[0],
          tipoDoacao: "Pix",
        });
        setShowModal(false);
        fetchData();
      } else {
        alert("Erro ao enviar os dados: " + result.message);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar os dados.");
    }
  };

  if (loading) return <p>Carregando lista de presentes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Presentes</h2>
      <div className="row justify-content-center">
        {gifts.map((gift) => {
          const maxQuantity = Number(gift[3]) || 0;
          const donatedQuantity = Number(gift[4]) || 0;
          const isDisabled = maxQuantity > 0 && donatedQuantity >= maxQuantity;

          return (
            <div key={gift[0]} className="col-10 col-md-4 mb-4">
              <div className="card">
                <h5 className="card-title">{gift[1]}</h5>
                <img src={gift[6]} alt={gift[1]} style={{ height: "200px", objectFit: "cover" }} />
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
                      <span className="d-flex justify-content-center gap-2">
                        <div>
                          <strong>Máximo:</strong> {maxQuantity}
                        </div>
                        <div>
                          <strong>Presenteado:</strong> {donatedQuantity}
                        </div>
                      </span>
                    )}
                  </p>
                  <Button
                    className="btn-custom"
                    onClick={() => {
                      setSelectedGift(gift);
                      setFormData({
                        ...formData,
                        item: gift[1], // Atualiza o nome do item no formData
                      });
                      setShowModal(true);
                    }}
                    disabled={isDisabled}
                  >
                    {isDisabled ? "Esgotado" : "Presentear"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DonationModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedGift={selectedGift} // Certifique-se que selectedGift contém as informações corretas
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData} // Passando setFormData como prop
      />
    </div>
  );
}

export default GiftList;
