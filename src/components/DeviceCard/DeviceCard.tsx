import { useNavigate } from 'react-router-dom';
import './DeviceCard.css';

type Props = {
  id: string;
  brand: string;
  model: string;
  mainImage: string;
  price: number;
  location: string;
};

export const DeviceCard: React.FC<Props> = ({
  id,
  brand,
  model,
  mainImage,
  price,
  location,
}) => {
  const navigate = useNavigate();

  return (
    <div className="device-card" onClick={() => navigate(id)}>
      <img className="device-card-image" src={mainImage} />
      <div className="device-card-description-block">
        <h2 className="device-card-title">{`${brand} ${model}`}</h2>
        <div className="device-info-block">
          <p className="device-location">{location}</p>
          <p className="device-rent-price">{`${price} грн/добу`}</p>
        </div>
      </div>
    </div>
  );
};
