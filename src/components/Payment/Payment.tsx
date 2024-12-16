import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPaymentCard } from '../UserPaymentCard';
import { getUserPaymentCards } from '../../api/paymentCards.ts';
import './Payment.css';

interface PaymentCard {
  id: number;
  cardNumber: string;
}

export const Payment: React.FC = () => {
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);

  useEffect(() => {
    const fetchPaymentCards = async () => {
      try {
        const cards = await getUserPaymentCards();
        setPaymentCards(cards.map((card, index) => ({ ...card, id: index })));
      } catch (error) {
        console.error('Error fetching payment cards:', error);
      }
    };

    fetchPaymentCards();
  }, []);

  return (
    <div className="payment-block">
      <div className="payment-cards-list">
        {paymentCards.map((card) => (
          <UserPaymentCard key={card.id} cardNumber={card.cardNumber} id={''} />
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
