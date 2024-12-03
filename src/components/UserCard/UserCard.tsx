import './UserCard.css';

export const AddedCard: React.FC = () => {
  return (
    <div className="added-card">
      <img src="/icons/master-card.svg" alt="card-brand-icon" />
      <p className="added-card-text">Mastercard ****2167</p>
      <img src="/icons/trash-bin.svg" alt="trash-bin-icon" />
    </div>
  );
};
