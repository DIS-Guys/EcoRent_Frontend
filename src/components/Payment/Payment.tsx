import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPaymentCard } from '../UserPaymentCard';
import { getUserPaymentCards } from '../../api/paymentCards.ts';
import './Payment.css';
import { PaymentCard } from '../../types/PaymentCard.ts';
import { toast } from 'react-toastify';

export const Payment: React.FC = () => {
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);

  useEffect(() => {
    const fetchPaymentCards = async () => {
      try {
        const cards = await getUserPaymentCards();
        setPaymentCards(cards);
      } catch (error) {
        toast.error('Помилка при завантаженні платіжних карток', {
          position: 'bottom-right',
        });
        console.error('Error fetching payment cards:', error);
      }
    };

    fetchPaymentCards();
  }, []);

  const handleDelete = (id: string) => {
    setPaymentCards((prevCards) => prevCards.filter((card) => card._id !== id));
  };

  return (
    <div className="payment-block">
      <div className="payment-cards-list">
        {paymentCards.map((card) => (
          <UserPaymentCard
            key={card._id}
            id={card._id}
            cardNumber={card.cardNumber}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Link to="add-card" className="add-button">
        <img
          className="add-card-icon"
          alt="Add card icon"
          src="/icons/plus-circle.svg"
        />
        Додати картку
      </Link>
    </div>
  );
};
