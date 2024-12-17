import { Link } from 'react-router-dom';
import './PersonalPageDeviceCard.css';

type Props = {
  id: string;
  mainImage: string;
  brand: string;
  model: string;
  isInRent: boolean;
  onDelete: (id: string) => void;
};

export const PersonalPageDeviceCard: React.FC<Props> = ({
  id,
  mainImage,
  brand,
  model,
  isInRent,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="personal-page-device-card">
      <button className="delete-device-button" onClick={handleDelete}>
        <img src="/icons/trash-bin-small.svg" alt="Delete device icon" />
      </button>
      <div className="personal-page-device-image">
        <img src={mainImage} alt={`${brand} ${model}`} />
      </div>
      <h3 className="personal-page-device-card-title">{`${brand} ${model}`}</h3>
      {isInRent ? <p>Здається в оренду</p> : <p>Доступний для оренди</p>}
      <Link
        to={`/rent/${id}`}
        className="review-device-button secondary-button"
      >
        Переглянути
      </Link>
    </div>
  );
};
