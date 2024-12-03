import { Link } from 'react-router-dom';

export const Payment: React.FC = () => {
  return (
    <Link to="add-card" className="add-button">
      <img
        className="add-card-icon"
        alt="Add card icon"
        src="/icons/plus-circle.svg"
      />
      Додати картку
    </Link>
  );
};
