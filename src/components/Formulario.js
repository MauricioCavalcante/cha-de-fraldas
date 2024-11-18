import React, { useState } from "react";

const Formulario = () => {
  const [formData, setFormData] = useState({
    id: "",
    item: "",
    doador: "",
    quantidade: "",
    data: "",
    tipoDoacao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwrfLDjCBKmQngPTh3DVVh5ZgiDKQk7RJt9vWVVzc6IJSvmrZ5LCpw9js6J5DDuBoh_/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),  // Formata os dados corretamente para envio
      });

      // Aguarda a resposta do Google Apps Script
      const result = await response.json();  // Tenta converter a resposta em JSON

      // Verifica o status da resposta
      if (result.status === "success") {
        alert("Dados enviados com sucesso!");
        setFormData({
          id: "",
          item: "",
          doador: "",
          quantidade: "",
          data: "",
          tipoDoacao: "",
        });
      } else {
        alert("Erro ao enviar os dados: " + result.message);  // Exibe o erro, caso não tenha sucesso
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar os dados.");  // Alerta geral em caso de falha na requisição
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Item:</label>
        <input
          type="text"
          name="item"
          value={formData.item}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Doado Por:</label>
        <input
          type="text"
          name="doador"  // 'doador' no lugar de 'doadoPor'
          value={formData.doador}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Quantidade:</label>
        <input
          type="number"
          name="quantidade"
          value={formData.quantidade}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Data:</label>
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Tipo de Doação:</label>
        <input
          type="text"
          name="tipoDoacao"  // 'tipoDoacao' no lugar de 'tipo'
          value={formData.tipoDoacao}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
