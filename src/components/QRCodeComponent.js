import React, { useState } from "react";
import { PIX } from "react-qrcode-pix";
import Button from "react-bootstrap/Button";

const PaymentQRCode = ({ valorTotal }) => {
  const [pixPayload, setPixPayload] = useState(""); // Estado para armazenar o payload

  const handleCopy = () => {
    if (pixPayload) {
      navigator.clipboard
        .writeText(pixPayload)
        .then(() => {
          alert("QRCode copiado para a área de transferência!");
        })
        .catch((err) => {
          console.error("Erro ao copiar o código Pix: ", err);
          alert("Erro ao copiar o código Pix.");
        });
    } else {
      alert("O código Pix ainda não está disponível.");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center payment-qrcode">
        <PIX
          pixkey="16eceee9-89b8-40d4-a180-8d2634ef8abf"
          merchant="JULIA CAVALCANTE SILVA"
          city="SAO PAULO"
          amount={parseFloat(valorTotal)}
          size={125}
          onLoad={(payload) => {
            setPixPayload(payload); // Salva o payload no estado
            console.log("Payload gerado:", payload); // Log para depuração
          }}
        />
      </div>
        <button className="d-flex btn-copy mt-4" onClick={handleCopy}>
          Copiar código Pix
        </button>
    </div>
  );
};

export default PaymentQRCode;
