import { Link } from 'react-router-dom';
import './Payment.css';

export const Payment: React.FC = () => {
  return (
    <Link to="add-card" className="add-card-button">
      <img
        className="add-card-icon"
        alt="Add card icon"
        src="/icons/plus-circle.svg"
      />
      Додати картку
    </Link>
  );
};
