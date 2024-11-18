import React from "react";
import Countdown from "../components/Countdown";
import GiftList from "../components/GiftList";

function Home() {
  return (
    <div className="container custom-container text-center mt-2">
      <div className="container-fluid container-title p-2">
        <h2>Bem-vindo ao Chá de Fraldas</h2>
        <h2> da Ana Clara!</h2>
      </div>
      <div className="container ursinha">
      <img className="img-fluid" src="/ursinha.png" alt="Ursinha" />

      </div>
      <div className="container-fluid justify-content-center col-12 col-md-7">
        <p className="lead convite">Estamos ansiosos para celebrar com você!</p>
      </div>
      <Countdown eventDate="2024-12-01T15:00:00" />
      <GiftList />
    </div>
  );
}

export default Home;
