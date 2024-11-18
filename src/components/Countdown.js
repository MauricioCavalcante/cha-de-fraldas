import React, { useState, useEffect } from 'react';

function Countdown({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(eventDate) - new Date();
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-primary">Faltam:</h2>
      <p className="h4">
        <span className="badge custom-badge me-2">{timeLeft.days} dias</span>
        <span className="badge custom-badge me-2">{timeLeft.hours} horas</span>
        <span className="badge custom-badge me-2">{timeLeft.minutes} minutos</span>
        <span className="badge custom-badge">{timeLeft.seconds} segundos</span>
      </p>
    </div>
  );
}

export default Countdown;
