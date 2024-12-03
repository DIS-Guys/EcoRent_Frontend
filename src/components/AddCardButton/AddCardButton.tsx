import './AddCardButton.css';

export const AddCardButton: React.FC = () => {
  return (
    <div className="add-card-button">
      <img className="plus-icon" alt="plus icon" src="/icons/plus-circle.svg" />
      <p className="add-card-button-text">Додати картку</p>
    </div>
  )
}