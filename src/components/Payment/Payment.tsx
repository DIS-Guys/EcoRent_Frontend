import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPaymentCard } from '../UserPaymentCard';
import { getUserPaymentCards } from '../../api/paymentCards.ts';
import './Payment.css';
import { PaymentCard } from '../../types/PaymentCard.ts';

export const Payment: React.FC = () => {
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);

  useEffect(() => {
    const fetchPaymentCards = async () => {
      try {
        const cards = await getUserPaymentCards();
        setPaymentCards(cards); // Завантажуємо картки
        console.log(paymentCards)
      } catch (error) {
        console.error('Error fetching payment cards:', error);
      }

    };

    fetchPaymentCards();
  }, []);

  const handleDelete = (id: string) => {
    console.log(paymentCards)
    setPaymentCards((prevCards) => prevCards.filter((card) => card._id !== id));
  };

  return (
    <div className="payment-block">
      <div className="payment-cards-list">
        {paymentCards.map((card) => (
          <UserPaymentCard
            key={card._id} // 'key' все ще використовується для React
            id={card._id} // Передаємо 'id' картки
            cardNumber={card.cardNumber}
            onDelete={handleDelete} // Передаємо функцію для обробки видалення
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
