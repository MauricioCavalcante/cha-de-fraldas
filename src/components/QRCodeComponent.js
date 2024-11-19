import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function QRCodeComponent({ pixCode }) {
  if (!pixCode) {
    return <p>Informações inválidas para gerar o QR Code</p>;
  }

  return (
    <div className="qrcode-container">
      <QRCodeCanvas
        value={pixCode} 
        size={100} 
        fgColor="#000000" 
        bgColor="#ffffff" 
      />
    </div>
  );
}

export default QRCodeComponent;
