import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { UserPaymentCard } from '../UserPaymentCard';
import { getUserPaymentCards } from '../../api/paymentCards.ts';
import { PaymentCard } from '../../types/PaymentCard.ts';
import './Payment.css';

export const Payment: React.FC = () => {
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);

  useEffect(() => {
    const fetchPaymentCards = async () => {
      try {
        const cards = await getUserPaymentCards();
        setPaymentCards(cards);
      } catch (error) {
        toast.error('Помилка при завантаженні карток.', {
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
      <Link
        to="add-card"
        className="add-button"
        state={{ cardAmount: paymentCards.length }}
        replace
      >
        <img
          className="add-card-icon"
          alt="Add card icon"
          src="/icons/plus-circle.svg"
        />
        Додати картку
      </Link>
      {paymentCards.map((card) => (
        <UserPaymentCard
          key={card._id}
          id={card._id}
          cardNumber={card.cardNumber}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
