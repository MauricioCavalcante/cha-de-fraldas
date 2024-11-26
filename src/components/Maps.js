import React from "react";

const Map = () => {
  return (
    <div className="container-fluid" style={{ width: "100%" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1142.1773358553255!2d-47.66106502670476!3d-15.655033274298258!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a13745b340ff3%3A0xc3f3b12e826d962a!2sEventos%20Palmeira%20Azul!5e0!3m2!1sen!2sbr!4v1732627005348!5m2!1sen!2sbr"
        width="100%"
        height="300"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
