import React, { useState } from "react";
import GiftList from "../components/GiftList";
import PresenceModal from "../components/PresenceModal";
import Button from "react-bootstrap/Button";

function Home() {
  const [modalShow, setModalShow] = useState(false); 
  const handleConfirm = (data) => { console.log("Dados confirmados:", data); };


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
        <p className="lead convite">Estamos ansiosos para celebrar com você!</p> 
        
        <Button type="button" className="btn-copy mt-3 mb-5" onClick={() => setModalShow(true)} > 
          Confirmar Presença 
        </Button> 
      </div> 
        <PresenceModal show={modalShow} handleClose={() => setModalShow(false)} handleConfirm={handleConfirm} />
        <GiftList />
    </div>
  );
}

export default Home;
