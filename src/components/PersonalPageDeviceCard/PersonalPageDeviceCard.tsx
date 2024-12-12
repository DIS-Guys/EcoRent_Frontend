import './PersonalPageDeviceCard.css';

type Props = {
  mainImage: string;
  brand: string;
  model: string;
  isInRent: boolean;
};

export const PersonalPageDeviceCard: React.FC<Props> = ({
  mainImage,
  brand,
  model,
  isInRent,
}) => {
  return (
    <div className="personal-page-device-card">
      <img src={mainImage} alt={`${brand} ${model}`} />
      <h3 className="personal-page-device-card-title">{`${brand} ${model}`}</h3>
      {isInRent ? <p>Здається в оренду</p> : <p>Доступний для оренди</p>}
      <button className="review-device-button secondary-button">
        Переглянути
      </button>
    </div>
  );
};
