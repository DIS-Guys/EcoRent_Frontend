import './AddCardButton.css';

export const AddCardButton: React.FC = () => {
  return (
    <div className="added-card">
      <img className="plus-icon" alt="plus icon" src="/icons/plus-circle.svg" />
      <p className="added-card-text">Додати картку</p>
    </div>
  )
}