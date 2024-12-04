import { useNavigate } from 'react-router-dom';
import './DeviceCard.css';

type Props = {
  id: string;
  brand: string;
  model: string;
  mainImage: string;
};

export const DeviceCard: React.FC<Props> = ({
  id,
  brand,
  model,
  mainImage,
}) => {
  const navigate = useNavigate();

  return (
    <div className="device-card" onClick={() => navigate(id)}>
      <img className="device-card-image" src={mainImage} />
      <div className="device-card-description-block">
        <h2 className="device-card-title">{`${brand} ${model}`}</h2>
        <div className="device-info-block">
          <p className="device-location">м. Полтава</p>
          <p className="device-rent-price">500 грн/день</p>
        </div>
      </div>
    </div>
  );
};
