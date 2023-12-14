import React, { useState } from 'react';

const DestekFormu = ({ onClose, onDestekGonder }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleDestekGonder = () => {
    // Formu sunucuya gönder
    const destekBilgileri = {
      subject,
      message,
    };

    onDestekGonder(destekBilgileri);
  };

  return (
    <div>
      <h2>Destek Talebi Oluştur</h2>
      <label htmlFor="subject">Konu:</label>
      <input
        type="text"
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <label htmlFor="message">Mesajınız:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleDestekGonder}>Destek Talebini Gönder</button>
      <button onClick={onClose}>Kapat</button>
    </div>
  );
};

export default DestekFormu;
