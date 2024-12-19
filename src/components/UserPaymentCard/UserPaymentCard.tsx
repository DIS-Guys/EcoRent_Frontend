import React from 'react';
import './UserPaymentCard.css';
import { deleteCard } from '../../api/paymentCards.ts';
import { toast } from 'react-toastify';

interface UserPaymentCardProps {
  id: string;
  cardNumber: string;
  onDelete: (id: string) => void;
}

export const UserPaymentCard: React.FC<UserPaymentCardProps> = ({
  id,
  cardNumber,
  onDelete,
}) => {
  const maskedCardNumber = `**** ${cardNumber.slice(-4)}`;

  const handleDelete = async () => {
    try {
      onDelete(id);
      await deleteCard(id);
    } catch (error) {
      toast.error('Помилка при видаленні платіжної картки.', {
        position: 'bottom-right',
      });
      console.error('Error deleting payment card:', error);
    }
  };

  return (
    <div className="user-payment-card">
      <img src="/icons/master-card.svg" alt="Payment system" />
      <p className="user-payment-card-text">Mastercard {maskedCardNumber}</p>
      <button className="delete-payment-card-button" onClick={handleDelete}>
        <img src="/icons/trash-bin.svg" alt="Delete card icon" />
      </button>
    </div>
  );
};
