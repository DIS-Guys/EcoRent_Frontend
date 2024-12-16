import './UserPaymentCard.css';

interface UserPaymentCardProps {
  key: string;
  cardNumber: string;
}

export const UserPaymentCard: React.FC<UserPaymentCardProps> = ({ key, cardNumber }) => {
  const maskedCardNumber = `**** ${cardNumber.slice(-4)}`;

  return (
    <div className="user-payment-card">
      <img src="/icons/master-card.svg" alt="Payment system" />
      <p className="user-payment-card-text">Mastercard {maskedCardNumber}</p>
      <button className="delete-payment-card-button">
        <img src="/icons/trash-bin.svg" alt="Delete card icon" />
      </button>
    </div>
  );
};
