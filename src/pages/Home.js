import React, { useState } from "react";
import GiftList from "../components/GiftList";
import PresenceModal from "../components/PresenceModal";
import Button from "react-bootstrap/Button";
import Maps from "../components/Maps";

function Home() {
  const [modalShow, setModalShow] = useState(false);
  const handleConfirm = (data) => {
    console.log("Dados confirmados:", data);
  };

  return (
    <div className="container custom-container text-center mt-2">
      <div className="container-fluid container-title p-2">
        <h2>Bem-vindo ao Chá de Fraldas</h2>
        <h2> da Ana Clara!</h2>
      </div>
      <div className="container ursinha">
        <img className="img-fluid" src="./ursinha.png" alt="Ursinha" />
      </div>
      <div className="container-fluid justify-content-center col-12 col-md-7">
        <div className="lead convite">
          <h5>Estamos ansiosos para celebrar com você!</h5>
          <h3>Data: 26/01/2025 às 12:00</h3>
        </div>
        <div className="p-3">
          <h5>Leve sua bebida!</h5>
        </div>
        <Maps />
        <Button
          type="button"
          className="btn-copy mt-3 mb-5"
          onClick={() => setModalShow(true)}
        >
          Confirmar Presença
        </Button>
      </div>
      <PresenceModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleConfirm={handleConfirm}
      />
      <GiftList />
    </div>
  );
}

export default Home;
