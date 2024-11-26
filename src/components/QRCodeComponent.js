import React, { useState } from "react";
import { PIX } from "react-qrcode-pix";

const PaymentQRCode = ({ valorTotal }) => {
  const [pixPayload, setPixPayload] = useState(""); // Estado para armazenar o payload

  const handleCopy = () => {
    if (pixPayload) {
      navigator.clipboard
        .writeText(pixPayload)
        .then(() => {
          document.getElementById('btnQRCode').textContent = "Copiado!"
        })
        .catch((err) => {
          console.error("Erro ao copiar o código Pix: ", err);
          alert("Erro ao copiar o código Pix.");
        });
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
            setPixPayload(payload);
            console.log("Payload gerado:", payload);
          }}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn-copy mt-4" id="btnQRCode" onClick={handleCopy}>
          Copiar código Pix
        </button>
      </div>
    </div>
  );
};

export default PaymentQRCode;
