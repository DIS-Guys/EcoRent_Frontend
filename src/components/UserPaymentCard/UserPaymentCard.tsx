import './UserPaymentCard.css';

export const UserPaymentCard: React.FC = () => {
  return (
    <div className="user-payment-card">
      <img src="/icons/master-card.svg" alt="Payment system" />
      <p className="user-payment-card-text">Mastercard ****2167</p>
      <button className='delete-payment-card-button'>
        <img src="/icons/trash-bin.svg" alt="Delete card icon" />
      </button>
    </div>
  );
};
