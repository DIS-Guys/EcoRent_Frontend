import React from 'react';
import './UserPaymentCard.css';
import { deleteCard } from '../../api/paymentCards.ts';
import { toast } from 'react-toastify';

type Props = {
  id: string;
  cardNumber: string;
  onDelete: (id: string) => void;
};

export const UserPaymentCard: React.FC<Props> = ({
  id,
  cardNumber,
  onDelete,
}) => {
  const maskedCardNumber = `**** ${cardNumber.slice(-4)}`;

  const handleDelete = async () => {
    try {
      await deleteCard(id);
      onDelete(id);
      toast.success('Картку видалено успішно.', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Помилка при видаленні картки.', {
        position: 'bottom-right',
      });
      console.error('Error deleting payment card:', error);
    }
  };

  return (
    <div className="user-payment-card">
      <img
        src={
          cardNumber.startsWith('5')
            ? '/icons/master-card.svg'
            : '/icons/visa.svg'
        }
        alt="Payment system"
      />
      <p className="user-payment-card-text">{`${
        cardNumber.startsWith('5') ? 'MasterCard' : 'Visa'
      } ${maskedCardNumber}`}</p>
      <button className="delete-payment-card-button" onClick={handleDelete}>
        <img src="/icons/trash-bin.svg" alt="Delete card icon" />
      </button>
    </div>
  );
};
