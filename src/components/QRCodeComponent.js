import React from 'react';
import { PIX } from 'react-qrcode-pix';

const PaymentQRCode = ({ valorTotal }) => {
  return (
    <PIX
      pixkey="05735168126"
      merchant="MAURICIO CAVALCANTE RIBEIRO"
      city="SAO PAULO"
      amount={parseFloat(valorTotal)}
      size={125}
      onLoad={(payload) => console.log('Payload:', payload)}
    />
  );
};

export default PaymentQRCode;
