import React, { useState } from 'react';
import './Support.css';
import { createTicket } from '../../api/tickets';
import { toast } from 'react-toastify';

export const Support: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createTicket({ userEmail: email, message });
      toast.success('Ticket created successfully', {
        position: 'bottom-right',
      });
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error('Failed to create ticket', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <div className="gray-container">
      <div className="support-block">
        <form className="support-form" onSubmit={handleSubmit}>
          <label htmlFor="supportEmail" className="main-label">
            Ваш E-mail
          </label>
          <input
            type="email"
            id="supportEmail"
            className="support-email-input info-input"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="supportTextArea" className="main-label">
            Проблема або питання
          </label>
          <textarea
            id="supportTextArea"
            className="support-textarea info-input"
            placeholder="Опишіть свою проблему"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit" className="support-send-button main-button">
            Відправити
          </button>
        </form>
      </div>
    </div>
  );
};
